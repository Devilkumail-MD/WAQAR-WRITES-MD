const axios = require('axios');
const URLS = ["https://dog.ceo/api/breeds/image/random"];
module.exports = {
  name: 'dog', aliases: ["puppy"], category: 'fun',
  description: 'Random dog picture', usage: '.dog',
  async execute(sock, msg, args, extra) {
    const url = URLS[Math.floor(Math.random()*URLS.length)];
    try {
      const r = await axios.get(url, { responseType: 'arraybuffer', timeout: 12000 });
      const buf = Buffer.from(r.data);
      let imgUrl = null;
      try {
        const j = JSON.parse(buf.toString());
        imgUrl = j.url || j.image || j.file || j.link || (j.message && j.message.url);
      } catch(_) {}
      if (imgUrl) {
        const r2 = await axios.get(imgUrl, { responseType:'arraybuffer', timeout: 12000 });
        await sock.sendMessage(extra.from, { image: Buffer.from(r2.data), caption: '🐶 dog' }, { quoted: msg });
      } else {
        await sock.sendMessage(extra.from, { image: buf, caption: '🐶 dog' }, { quoted: msg });
      }
    } catch (e) { extra.reply('❌ Failed to fetch dog: ' + e.message); }
  }
};
