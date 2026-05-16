const axios = require('axios');
module.exports = {
  name: 'get', aliases: ['fetch','download'], category: 'tools',
  description: 'Download a file from a direct URL (max 16 MB)',
  usage: '.get <url>',
  async execute(sock, msg, args, extra) {
    const url = args[0];
    if (!url || !/^https?:/.test(url)) return extra.reply('Usage: .get https://example.com/file.jpg');
    try {
      const r = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000, maxContentLength: 16*1024*1024 });
      const buf = Buffer.from(r.data);
      const ct = (r.headers['content-type']||'').toLowerCase();
      if (ct.startsWith('image/')) await sock.sendMessage(extra.from, { image: buf }, { quoted: msg });
      else if (ct.startsWith('video/')) await sock.sendMessage(extra.from, { video: buf }, { quoted: msg });
      else if (ct.startsWith('audio/')) await sock.sendMessage(extra.from, { audio: buf, mimetype: ct }, { quoted: msg });
      else await sock.sendMessage(extra.from, { document: buf, mimetype: ct||'application/octet-stream', fileName: url.split('/').pop()||'file' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
