const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'bite', category: 'anime',
  description: 'Anime bite',
  usage: '.bite',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'bite', '😬 *bites*'),
};
