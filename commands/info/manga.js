const axios = require('axios');
module.exports = {
  name: 'manga', aliases: [], category: 'info',
  description: 'Get manga info from MyAnimeList', usage: '.manga <name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .manga One Piece');
    try {
      const r = await axios.get('https://api.jikan.moe/v4/manga', { params:{ q, limit:1 }, timeout:12000 });
      const m = r.data.data?.[0];
      if (!m) return extra.reply('❌ Not found.');
      const cap = '📚 *' + m.title + '*\n\n• Chapters: ' + (m.chapters||'-') + '\n• Status: ' + (m.status||'-') + '\n• Score: ' + (m.score||'-') + ' ⭐\n\n' + (m.synopsis||'').slice(0,800) + '\n\n🔗 ' + (m.url||'');
      const thumb = m.images?.jpg?.large_image_url || m.images?.jpg?.image_url;
      if (thumb) await sock.sendMessage(extra.from, { image:{url:thumb}, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
