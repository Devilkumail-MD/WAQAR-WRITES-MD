module.exports = {
  name: 's', aliases: [], category: 'media',
  description: 'Create sticker (alias)', usage: '.s (reply to image)',
  async execute(sock, msg, args, extra) {
    const h = require('../general/sticker');
    return h.execute(sock, msg, args, extra);
  }
};
