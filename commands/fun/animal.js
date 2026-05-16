const axios = require('axios');
const SOURCES = [
  () => axios.get('https://api.thecatapi.com/v1/images/search').then(r=>r.data[0].url),
  () => axios.get('https://dog.ceo/api/breeds/image/random').then(r=>r.data.message),
  () => axios.get('https://randomfox.ca/floof/').then(r=>r.data.image),
  () => axios.get('https://api.sefinek.net/api/v2/random/animal/duck').then(r=>r.data.message).catch(()=>null)
];
module.exports = {
  name: 'animal', aliases: ['randomanimal'], category: 'fun',
  description: 'Random cute animal picture', usage: '.animal',
  async execute(sock, msg, args, extra) {
    const fn = SOURCES[Math.floor(Math.random()*SOURCES.length)];
    try {
      const url = await fn();
      if (!url) throw new Error('no url');
      const r = await axios.get(url, { responseType:'arraybuffer', timeout:12000 });
      await sock.sendMessage(extra.from, { image: Buffer.from(r.data), caption: '🐾 Random animal' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
