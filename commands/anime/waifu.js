const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'waifu', category: 'anime',
  description: 'Random SFW anime waifu image',
  usage: '.waifu',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'waifu', '💖 Here is your waifu~'),
};
