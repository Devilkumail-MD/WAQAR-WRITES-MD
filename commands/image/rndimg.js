const axios = require('axios');
module.exports = {
  name: 'rndimg', aliases: ["randomimage"], category: 'image',
  description: 'Random image', usage: '.rndimg',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?wallpaper,nature&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '🖼️ rndimg' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
