const axios = require('axios');
module.exports = {
  name: 'git', aliases: ['gitinfo'], category: 'downloader',
  description: 'Get GitHub repo info',
  usage: '.git <owner/repo>',
  async execute(sock, msg, args, extra) {
    let target = args[0];
    if (!target) return extra.reply('Usage: .git owner/repo');
    target = target.replace(/^https?:\/\/github\.com\//,'').replace(/\.git$/,'');
    try {
      const r = await axios.get('https://api.github.com/repos/' + target, { timeout: 10000 });
      const d = r.data;
      const cap = '📦 *' + d.full_name + '*\n\n' + (d.description||'') + '\n\n• ⭐ ' + d.stargazers_count + '\n• 🍴 ' + d.forks_count + '\n• 👁 ' + d.subscribers_count + '\n• 📝 ' + (d.language||'-') + '\n• 🔗 ' + d.html_url;
      extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + (e.response?.data?.message || e.message)); }
  }
};
