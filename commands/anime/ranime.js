const axios = require('axios');
module.exports = {
  name: 'ranime', aliases: ['randomanime'], category: 'anime',
  description: 'Random anime suggestion', usage: '.ranime',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://api.jikan.moe/v4/random/anime', { timeout:12000 });
      const a = r.data.data;
      if (!a) return extra.reply('❌ No data.');
      const cap = '🎲 *Random Anime*\n\n📺 ' + a.title + '\n• Score: ' + (a.score||'-') + '\n• Episodes: ' + (a.episodes||'-') + '\n\n' + (a.synopsis||'').slice(0,500) + '\n\n🔗 ' + a.url;
      const thumb = a.images?.jpg?.large_image_url;
      if (thumb) await sock.sendMessage(extra.from, { image:{url:thumb}, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
