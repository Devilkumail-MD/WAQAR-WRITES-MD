const axios = require('axios');
module.exports = {
  name: 'aquote', aliases: ['animequote'], category: 'anime',
  description: 'Random anime quote', usage: '.aquote',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://animechan.io/api/v1/quotes/random', { timeout: 10000 });
      const d = r.data?.data;
      if (d) return extra.reply('💬 "' + d.content + '"\n\n— ' + d.character?.name + ' (' + d.anime?.name + ')');
      throw new Error('no data');
    } catch (e) {
      try {
        const r2 = await axios.get('https://yurippe.vercel.app/api/quotes?random=1', { timeout: 10000 });
        const q = r2.data?.[0];
        if (q) return extra.reply('💬 "' + q.quote + '"\n\n— ' + q.character + ' (' + q.show + ')');
      } catch(_) {}
      extra.reply('❌ Quote API unreachable.');
    }
  }
};
