const axios = require('axios');
module.exports = {
  name: 'quote', aliases: ['randomquote'], category: 'anime',
  description: 'Random inspirational quote', usage: '.quote',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://api.quotable.io/random', { timeout: 10000 });
      extra.reply('💬 "' + r.data.content + '"\n\n— ' + r.data.author);
    } catch (e) {
      try {
        const r2 = await axios.get('https://zenquotes.io/api/random', { timeout: 10000 });
        const q = r2.data?.[0]; if (q) return extra.reply('💬 "' + q.q + '"\n\n— ' + q.a);
      } catch(_) {}
      extra.reply('❌ ' + e.message);
    }
  }
};
