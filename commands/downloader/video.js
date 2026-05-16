module.exports = {
  name: 'video', aliases: [], category: 'downloader',
  description: 'Download video (alias)',
  usage: '.video <url|query>',
  async execute(sock, msg, args, extra) {
    const h = require('../media/video');
    return h.execute(sock, msg, args, extra);
  }
};
