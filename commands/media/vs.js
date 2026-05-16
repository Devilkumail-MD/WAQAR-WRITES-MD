module.exports = {
  name: 'vs', aliases: ['videosticker'], category: 'media',
  description: 'Create animated sticker from video', usage: '.vs (reply to short video)',
  async execute(sock, msg, args, extra) {
    const h = require('../general/sticker');
    return h.execute(sock, msg, args, extra);
  }
};
