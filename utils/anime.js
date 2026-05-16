/**
 * Anime image helper - uses waifu.pics (SFW endpoints only, free, no key)
 * Centralizes fetch + send so each command file stays ~5 lines.
 */
const axios = require('axios');

const UA = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/json',
};

async function fetchWaifuPics(category) {
  const r = await axios.get(`https://api.waifu.pics/sfw/${encodeURIComponent(category)}`, {
    headers: UA,
    timeout: 12000,
  });
  if (!r.data || !r.data.url) throw new Error('No image url from waifu.pics');
  return r.data.url;
}

async function sendAnimeImage(sock, msg, extra, category, caption) {
  const chatId = extra.from;
  try {
    await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
    const url = await fetchWaifuPics(category);
    const img = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': UA['User-Agent'], Accept: 'image/*' },
      timeout: 15000,
    });
    const buf = Buffer.from(img.data);
    if (!buf.length) throw new Error('Empty image buffer');
    await sock.sendMessage(
      chatId,
      { image: buf, caption: caption || '' },
      { quoted: msg }
    );
    await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
  } catch (e) {
    await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
    await extra.reply('Anime fetch failed: ' + (e.message || 'unknown error'));
  }
}

module.exports = { fetchWaifuPics, sendAnimeImage };
