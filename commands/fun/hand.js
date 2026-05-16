const axios = require('axios');
module.exports = {
  name: 'hand', aliases: [], category: 'fun',
  description: 'Hand image', usage: '.hand',
  async execute(sock, msg, args, extra) {
    try {
      const url = 'https://source.unsplash.com/featured/?hand,fingers&sig=' + Date.now();
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 15000, maxRedirects: 5 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '✋ hand' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
