const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'cuddle', category: 'anime',
  description: 'Cuddle (anime style)',
  usage: '.cuddle',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'cuddle', '🥰 *cuddles you*'),
};
