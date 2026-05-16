const axios = require('axios');
const SOURCES = [
  'https://api.waifu.pics/sfw/dance',
  'https://api.waifu.pics/sfw/wave',
  'https://api.waifu.pics/sfw/highfive',
  'https://api.waifu.pics/sfw/hug',
  'https://api.waifu.pics/sfw/yeet'
];
module.exports = {
  name: 'rndvideo', aliases: ['randomvideo'], category: 'video',
  description: 'Send a random short video/GIF', usage: '.rndvideo',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get(SOURCES[Math.floor(Math.random()*SOURCES.length)], { timeout: 10000 });
      const url = r.data && r.data.url;
      if (!url) throw new Error('no url');
      const v = await axios.get(url, { responseType:'arraybuffer', timeout: 15000 });
      await sock.sendMessage(extra.from, { video: Buffer.from(v.data), caption: '🎬 Random video', gifPlayback: true }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
