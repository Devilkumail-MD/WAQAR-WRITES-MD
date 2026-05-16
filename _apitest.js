async function test(name, fn) {
  try {
    const t = Date.now();
    const r = await Promise.race([fn(), new Promise((_,j)=>setTimeout(()=>j(new Error('timeout')),20000))]);
    console.log(`✅ ${name} (${Date.now()-t}ms): ${JSON.stringify(r).slice(0,200)}`);
  } catch(e) { console.log(`❌ ${name}: ${String(e.message||e).slice(0,200)}`); }
}
(async () => {
  // YouTube info via @distube/ytdl-core
  await test('@distube/ytdl-core getInfo', async () => {
    const ytdl = require('@distube/ytdl-core');
    const info = await ytdl.getInfo('https://youtu.be/dQw4w9WgXcQ');
    return { title: info.videoDetails.title, formats: info.formats.length, hasAudio: info.formats.some(f=>f.hasAudio) };
  });
  // TikTok
  await test('@tobyg74/tiktok-api-dl', async () => {
    const TiktokDL = require('@tobyg74/tiktok-api-dl');
    const r = await TiktokDL.Downloader('https://vm.tiktok.com/ZS6kE5fXY/', { version: 'v1' });
    return { status: r.status, hasVideo: !!r.result?.video };
  });
  // btch-downloader IG
  await test('btch-downloader IG', async () => {
    const b = require('btch-downloader');
    const r = await b.igdl('https://www.instagram.com/p/DA9z7q5SHFv/');
    return { isArray: Array.isArray(r), len: Array.isArray(r) ? r.length : 0, keys: Array.isArray(r) ? Object.keys(r[0]||{}) : Object.keys(r||{}) };
  });
  // btch-downloader FB
  await test('btch-downloader FB', async () => {
    const b = require('btch-downloader');
    const r = await b.fbdown('https://www.facebook.com/watch?v=10153231379946729');
    return { keys: Object.keys(r||{}), hasUrl: !!(r?.Normal_video || r?.HD || r?.SD) };
  });
  // btch-downloader Pinterest
  await test('btch-downloader Pinterest', async () => {
    const b = require('btch-downloader');
    const r = await b.pinterest('https://pin.it/4uEafJv');
    return { keys: Object.keys(r||{}), hasResult: !!r };
  });
  // btch-downloader Twitter
  await test('btch-downloader Twitter', async () => {
    const b = require('btch-downloader');
    const r = await b.twitter('https://x.com/elonmusk/status/1850000000000000000');
    return { keys: Object.keys(r||{}) };
  });
  // btch-downloader MediaFire
  await test('btch-downloader MediaFire', async () => {
    const b = require('btch-downloader');
    const r = await b.mediafire('https://www.mediafire.com/file/ka2520d6kdz0vfp/Test.txt/file');
    return { keys: Object.keys(r||{}) };
  });
  // Genius lyrics
  await test('genius-lyrics', async () => {
    const Genius = require('genius-lyrics');
    const Client = new Genius.Client();
    const songs = await Client.songs.search('despacito');
    const lyrics = songs[0] ? await songs[0].lyrics() : null;
    return { found: !!lyrics, len: lyrics?.length };
  });
})();
