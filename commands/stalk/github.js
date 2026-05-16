const axios = require('axios');
module.exports = {
  name: 'github', aliases: ['ghuser'], category: 'stalk',
  description: 'Get GitHub user profile info',
  usage: '.github <username>',
  async execute(sock, msg, args, extra) {
    const u = args[0];
    if (!u) return extra.reply('Usage: .github <username>');
    try {
      const r = await axios.get('https://api.github.com/users/' + u, { timeout: 10000 });
      const d = r.data;
      const cap = '👤 *' + (d.name||d.login) + '* (@' + d.login + ')\n\n' + (d.bio||'') + '\n\n• 📦 Repos: ' + d.public_repos + '\n• 👥 Followers: ' + d.followers + '\n• ➡️ Following: ' + d.following + '\n• 🌍 ' + (d.location||'-') + '\n• 🔗 ' + d.html_url;
      if (d.avatar_url) await sock.sendMessage(extra.from, { image:{url:d.avatar_url}, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + (e.response?.data?.message || e.message)); }
  }
};
