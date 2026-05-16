const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'slap', category: 'anime',
  description: 'Slap someone (anime style)',
  usage: '.slap',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'slap', '👋 *anime slap!*'),
};
