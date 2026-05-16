const axios = require('axios');
module.exports = {
  name: 'shinobu', aliases: [], category: 'anime',
  description: 'Anime shinobu image', usage: '.shinobu',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://api.waifu.pics/sfw/shinobu', { timeout:10000 });
      const url = r.data && r.data.url;
      if (!url) throw new Error('no url');
      const i = await axios.get(url, { responseType:'arraybuffer', timeout:12000 });
      const isVid = /\.(gif|mp4|webm)$/i.test(url);
      if (isVid) await sock.sendMessage(extra.from, { video: Buffer.from(i.data), caption: '🎀 shinobu', gifPlayback: true }, { quoted: msg });
      else await sock.sendMessage(extra.from, { image: Buffer.from(i.data), caption: '🎀 shinobu' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
