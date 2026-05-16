const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'megumin', category: 'anime',
  description: 'Random Megumin (Konosuba) image',
  usage: '.megumin',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'megumin', '💥 EXPLOSION!'),
};
