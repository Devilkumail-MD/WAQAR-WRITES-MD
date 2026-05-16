const axios = require('axios');
module.exports = {
  name: 'nkopimg', aliases: ["rndimg"], category: 'fun',
  description: 'Random aesthetic image', usage: '.nkopimg',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?aesthetic,wallpaper&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '🖼️ nkopimg' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
