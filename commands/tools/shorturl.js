const axios = require('axios');
module.exports = {
  name: 'shorturl', aliases: ['short','tinyurl'], category: 'tools',
  description: 'Shorten a URL using TinyURL',
  usage: '.shorturl <url>',
  async execute(sock, msg, args, extra) {
    const url = args[0];
    if (!url || !/^https?:/.test(url)) return extra.reply('Usage: .shorturl https://example.com');
    try {
      const r = await axios.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url), { timeout: 10000 });
      extra.reply('🔗 Short URL:\n' + r.data);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
