const axios = require('axios');
module.exports = {
  name: 'anime', aliases: ['animeinfo','asearch'], category: 'info',
  description: 'Get anime info from MyAnimeList', usage: '.anime <name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .anime Naruto');
    try {
      const r = await axios.get('https://api.jikan.moe/v4/anime', { params: { q, limit: 1 }, timeout: 12000 });
      const a = r.data.data?.[0];
      if (!a) return extra.reply('❌ Not found.');
      const cap = '📺 *' + (a.title||'') + '*\n\n' +
        '• Type: ' + (a.type||'-') + '\n' +
        '• Episodes: ' + (a.episodes||'-') + '\n' +
        '• Status: ' + (a.status||'-') + '\n' +
        '• Score: ' + (a.score||'-') + ' ⭐\n' +
        '• Year: ' + (a.year||'-') + '\n' +
        '• Genres: ' + ((a.genres||[]).map(g=>g.name).join(', ')||'-') + '\n\n' +
        (a.synopsis||'').slice(0,800) + '\n\n🔗 ' + (a.url||'');
      const thumb = a.images?.jpg?.large_image_url || a.images?.jpg?.image_url;
      if (thumb) await sock.sendMessage(extra.from, { image: { url: thumb }, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
