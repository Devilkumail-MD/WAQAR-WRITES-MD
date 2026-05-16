module.exports = {
  name: 'fb', aliases: [], category: 'downloader',
  description: 'Download Facebook video (alias)',
  usage: '.fb <url>',
  async execute(sock, msg, args, extra) {
    const h = require('../media/facebook');
    return h.execute(sock, msg, args, extra);
  }
};
