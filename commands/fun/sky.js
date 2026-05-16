const axios = require('axios');
module.exports = {
  name: 'sky', aliases: [], category: 'fun',
  description: 'Sky/clouds wallpaper', usage: '.sky',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?sky,clouds&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '☁️ sky' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
