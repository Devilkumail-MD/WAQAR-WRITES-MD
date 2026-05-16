const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'blush', category: 'anime',
  description: 'Blushing anime face',
  usage: '.blush',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'blush', '☺️ *blushes*'),
};
