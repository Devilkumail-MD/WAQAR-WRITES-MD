module.exports = {
  name: 'insta', aliases: ['ig'], category: 'downloader',
  description: 'Download Instagram media (alias)',
  usage: '.insta <url>',
  async execute(sock, msg, args, extra) {
    const h = require('../media/instagram');
    return h.execute(sock, msg, args, extra);
  }
};
