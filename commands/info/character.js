const axios = require('axios');
module.exports = {
  name: 'character', aliases: ['achar'], category: 'info',
  description: 'Get anime character info', usage: '.character <name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .character Goku');
    try {
      const r = await axios.get('https://api.jikan.moe/v4/characters', { params:{ q, limit:1 }, timeout:12000 });
      const c = r.data.data?.[0];
      if (!c) return extra.reply('❌ Not found.');
      const cap = '👤 *' + c.name + '*\n\n' + (c.about||'').slice(0,800) + '\n\n🔗 ' + (c.url||'');
      const thumb = c.images?.jpg?.image_url;
      if (thumb) await sock.sendMessage(extra.from, { image:{url:thumb}, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
