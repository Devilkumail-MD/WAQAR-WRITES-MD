const axios = require('axios');
module.exports = {
  name: 'gitclone', aliases: ['clone'], category: 'downloader',
  description: 'Download a GitHub repo as zip',
  usage: '.gitclone <github url|owner/repo>',
  async execute(sock, msg, args, extra) {
    let target = args[0];
    if (!target) return extra.reply('Usage: .gitclone owner/repo');
    target = target.replace(/^https?:\/\/github\.com\//,'').replace(/\.git$/,'');
    const [owner, repo] = target.split('/');
    if (!owner || !repo) return extra.reply('Format: owner/repo');
    try {
      const meta = await axios.get('https://api.github.com/repos/' + owner + '/' + repo, { timeout: 10000 });
      const branch = meta.data.default_branch || 'main';
      const url = 'https://codeload.github.com/' + owner + '/' + repo + '/zip/refs/heads/' + branch;
      extra.reply('📦 Downloading ' + owner + '/' + repo + ' (' + branch + ')...');
      const r = await axios.get(url, { responseType:'arraybuffer', timeout: 60000, maxContentLength: 50*1024*1024 });
      await sock.sendMessage(extra.from, { document: Buffer.from(r.data), mimetype:'application/zip', fileName: repo + '-' + branch + '.zip' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
