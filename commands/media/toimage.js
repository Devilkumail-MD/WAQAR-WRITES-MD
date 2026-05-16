module.exports = {
  name: 'toimage', aliases: ['sticker2img'], category: 'media',
  description: 'Convert sticker to image', usage: '.toimage (reply to sticker)',
  async execute(sock, msg, args, extra) {
    const h = require('../general/simage');
    return h.execute(sock, msg, args, extra);
  }
};
