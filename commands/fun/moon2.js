const axios = require('axios');
module.exports = {
  name: 'moon2', aliases: [], category: 'fun',
  description: 'Another moon picture', usage: '.moon2',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?fullmoon,sky&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '🌕 moon2' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
