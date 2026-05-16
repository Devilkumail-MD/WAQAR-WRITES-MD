module.exports = {
  name: 'pint', aliases: ['pinterest2'], category: 'downloader',
  description: 'Download Pinterest media (alias)',
  usage: '.pint <url>',
  async execute(sock, msg, args, extra) {
    const h = require('../media/pinterest');
    return h.execute(sock, msg, args, extra);
  }
};
