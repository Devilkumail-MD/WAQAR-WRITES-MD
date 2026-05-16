const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'dance', category: 'anime',
  description: 'Anime dance',
  usage: '.dance',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'dance', '💃 *dances*'),
};
