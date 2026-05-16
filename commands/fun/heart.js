const axios = require('axios');
module.exports = {
  name: 'heart', aliases: [], category: 'fun',
  description: 'Heart/love image', usage: '.heart',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?heart,love&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '❤️ heart' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
