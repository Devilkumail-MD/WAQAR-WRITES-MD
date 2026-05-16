const axios = require('axios');
module.exports = {
  name: 'cats', aliases: [], category: 'fun',
  description: 'Send 3 random cat pictures', usage: '.cats',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://api.thecatapi.com/v1/images/search?limit=3', { timeout: 12000 });
      for (const item of r.data) {
        try {
          const i = await axios.get(item.url, { responseType:'arraybuffer', timeout: 12000 });
          await sock.sendMessage(extra.from, { image: Buffer.from(i.data), caption: '🐱' }, { quoted: msg });
        } catch(_) {}
      }
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
