// utils/downloaders.js
// Central download helper. Single source of truth for all download commands.
// YouTube: yt-dlp binary (installed via nixpacks).
// Other platforms: btch-downloader npm package.

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const axios = require('axios');

let btch = null;
try { btch = require('btch-downloader'); } catch (_) { btch = null; }

let yts = null;
try { yts = require('yt-search'); } catch (_) { yts = null; }

const YTDLP_BIN = process.env.YTDLP_BIN || 'yt-dlp';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function tmpFile(ext) {
  return path.join(os.tmpdir(), `dl_${Date.now()}_${Math.floor(Math.random() * 1e6)}.${ext}`);
}

function runYtDlp(args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(YTDLP_BIN, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '';
    p.stdout.on('data', d => { stdout += d.toString(); });
    p.stderr.on('data', d => { stderr += d.toString(); });
    const timer = setTimeout(() => { try { p.kill('SIGKILL'); } catch {} reject(new Error('yt-dlp timeout')); }, opts.timeoutMs || 180000);
    p.on('error', e => { clearTimeout(timer); reject(e); });
    p.on('close', code => {
      clearTimeout(timer);
      if (code !== 0) return reject(new Error('yt-dlp exited ' + code + ': ' + stderr.slice(0, 400)));
      resolve(stdout);
    });
  });
}

async function ytdlpAvailable() {
  try { await runYtDlp(['--version'], { timeoutMs: 8000 }); return true; }
  catch { return false; }
}

// Search YouTube by query (returns first video).
async function ytSearch(query) {
  if (!yts) throw new Error('yt-search not installed');
  const r = await yts(query);
  const v = r.videos && r.videos[0];
  if (!v) throw new Error('No YouTube results');
  return {
    url: v.url,
    title: v.title,
    duration: v.timestamp,
    seconds: v.seconds,
    thumbnail: v.thumbnail,
    author: v.author?.name,
    views: v.views,
  };
}

// Download YouTube audio as Buffer (mp3, 128kbps).
async function ytAudio(urlOrQuery) {
  const isUrl = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|m\.youtube\.com)\//i.test(urlOrQuery);
  let url = urlOrQuery, meta = null;
  if (!isUrl) { meta = await ytSearch(urlOrQuery); url = meta.url; }
  else { try { meta = await ytSearch(urlOrQuery); } catch {} }

  const out = tmpFile('mp3');
  try {
    await runYtDlp([
      '-f', 'bestaudio/best',
      '--extract-audio', '--audio-format', 'mp3', '--audio-quality', '128K',
      '--no-playlist', '--no-warnings', '--no-call-home', '--no-check-certificate',
      '-o', out, url,
    ]);
    const buf = fs.readFileSync(out);
    return { buffer: buf, title: meta?.title || 'audio', thumbnail: meta?.thumbnail, duration: meta?.duration, url };
  } finally { try { fs.unlinkSync(out); } catch {} }
}

// Download YouTube video as Buffer (mp4, 360p default).
async function ytVideo(urlOrQuery, quality = '360') {
  const isUrl = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|m\.youtube\.com)\//i.test(urlOrQuery);
  let url = urlOrQuery, meta = null;
  if (!isUrl) { meta = await ytSearch(urlOrQuery); url = meta.url; }
  else { try { meta = await ytSearch(urlOrQuery); } catch {} }

  const out = tmpFile('mp4');
  try {
    await runYtDlp([
      '-f', `best[height<=${quality}][ext=mp4]/best[ext=mp4]/best`,
      '--merge-output-format', 'mp4',
      '--no-playlist', '--no-warnings', '--no-call-home', '--no-check-certificate',
      '-o', out, url,
    ]);
    const buf = fs.readFileSync(out);
    return { buffer: buf, title: meta?.title || 'video', thumbnail: meta?.thumbnail, duration: meta?.duration, url };
  } finally { try { fs.unlinkSync(out); } catch {} }
}

// Helper: download a URL as a Buffer.
async function fetchBuffer(url, opts = {}) {
  const r = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: opts.timeout || 90000,
    maxContentLength: Infinity, maxBodyLength: Infinity,
    headers: { 'User-Agent': UA, Accept: '*/*', ...(opts.headers || {}) },
  });
  return Buffer.from(r.data);
}

// TikTok — returns { video, audio, title, thumbnail }
async function tiktok(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.ttdl(url);
  if (!r || !r.video) throw new Error('TikTok: no media found');
  return {
    videoUrl: Array.isArray(r.video) ? r.video[0] : r.video,
    audioUrl: Array.isArray(r.audio) ? r.audio[0] : r.audio,
    title: r.title,
    thumbnail: r.thumbnail,
  };
}

// Instagram — returns array of media items { url, type: 'video'|'image' }
async function instagram(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.igdl(url);
  if (!r || !r.result || !r.result.length) throw new Error('Instagram: no media found');
  return r.result.map(it => {
    const u = it.url || it.thumbnail;
    const isVideo = /\.mp4(\?|$)/i.test(u || '') || it.type === 'video';
    return { url: u, type: isVideo ? 'video' : 'image' };
  }).filter(x => x.url);
}

// Facebook — returns { hd, sd, thumbnail }
async function facebook(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.fbdown(url);
  if (!r || !(r.HD || r.SD || r.Normal_video)) throw new Error('Facebook: no media found');
  return { hd: r.HD || r.Normal_video, sd: r.SD || r.Normal_video, thumbnail: r.thumbnail };
}

// Pinterest — returns { url, type }
async function pinterest(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.pinterest(url);
  if (!r) throw new Error('Pinterest: no result');
  let mediaUrl = null;
  if (Array.isArray(r.result)) mediaUrl = r.result[0];
  else if (typeof r.result === 'string') mediaUrl = r.result;
  else if (r.url) mediaUrl = r.url;
  if (!mediaUrl) throw new Error('Pinterest: no URL');
  const isVideo = /\.mp4(\?|$)/i.test(mediaUrl);
  return { url: mediaUrl, type: isVideo ? 'video' : 'image' };
}

// Twitter / X — returns { url, title }
async function twitter(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.twitter(url);
  if (!r || !r.url) throw new Error('Twitter: no media found');
  return { url: Array.isArray(r.url) ? r.url[0] : r.url, title: r.title };
}

// MediaFire — returns { url, filename, size, mime }
async function mediafire(url) {
  if (!btch) throw new Error('btch-downloader not installed');
  const r = await btch.mediafire(url);
  if (!r || !r.result) throw new Error('MediaFire: no result');
  const res = Array.isArray(r.result) ? r.result[0] : r.result;
  const link = res.url || res.link;
  if (!link) throw new Error('MediaFire: no download URL');
  return { url: link, filename: res.filename || 'file', size: res.size, mime: res.mime };
}

// Lyrics — scrapes some.fish or similar public source via axios.
async function lyrics(query) {
  // Try a couple of free, key-less sources.
  const sources = [
    async () => {
      // lyrics.ovh — free, no key, very stable
      const [artist, ...rest] = query.split(/[-:|]/);
      const title = rest.join(' ').trim() || artist;
      const a = (artist || '').trim();
      const t = (title || '').trim();
      if (!a || !t || a === t) throw new Error('lyrics.ovh needs "artist - title"');
      const r = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(a)}/${encodeURIComponent(t)}`, { timeout: 15000 });
      if (!r.data?.lyrics) throw new Error('not found');
      return { lyrics: r.data.lyrics.trim(), title: `${a} - ${t}` };
    },
    async () => {
      // Fallback: search lyrics via DuckDuckGo Instant Answer (very loose)
      const r = await axios.get(`https://api.lyrics.ovh/suggest/${encodeURIComponent(query)}`, { timeout: 15000 });
      const hit = r.data?.data?.[0];
      if (!hit) throw new Error('no suggestion');
      const lr = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(hit.artist.name)}/${encodeURIComponent(hit.title)}`, { timeout: 15000 });
      if (!lr.data?.lyrics) throw new Error('not found');
      return { lyrics: lr.data.lyrics.trim(), title: `${hit.artist.name} - ${hit.title}` };
    },
  ];
  let lastErr;
  for (const src of sources) {
    try { return await src(); } catch (e) { lastErr = e; }
  }
  throw new Error(lastErr?.message || 'lyrics not found');
}

module.exports = {
  ytSearch, ytAudio, ytVideo, ytdlpAvailable,
  tiktok, instagram, facebook, pinterest, twitter, mediafire, lyrics,
  fetchBuffer,
};
