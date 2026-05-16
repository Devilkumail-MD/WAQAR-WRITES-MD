const axios = require('axios');
module.exports = {
  name: 'emojimix', aliases: ['mixemoji'], category: 'media',
  description: 'Mix two emojis into a sticker',
  usage: '.emojimix 😀+😎',
  async execute(sock, msg, args, extra) {
    const t = args.join('').replace(/\s/g,'');
    const parts = t.split('+');
    if (parts.length < 2) return extra.reply('Usage: .emojimix 😀+😎');
    try {
      const [a,b] = parts;
      const r = await axios.get('https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=' + encodeURIComponent(a + '_' + b), { timeout: 10000 });
      const url = r.data?.results?.[0]?.url;
      if (!url) return extra.reply('❌ No mix found.');
      const i = await axios.get(url, { responseType:'arraybuffer', timeout: 12000 });
      await sock.sendMessage(extra.from, { sticker: Buffer.from(i.data) }, { quoted: msg });
    } catch (e) { extra.reply('❌ Emoji mix failed.'); }
  }
};
