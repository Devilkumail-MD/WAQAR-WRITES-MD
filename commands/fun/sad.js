const axios = require('axios');
module.exports = {
  name: 'sad', aliases: [], category: 'fun',
  description: 'Sad mood image', usage: '.sad',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?sad,rain&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '😢 sad' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
