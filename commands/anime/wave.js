const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'wave', category: 'anime',
  description: 'Wave hello (anime style)',
  usage: '.wave',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'wave', '👋 *waves*'),
};
