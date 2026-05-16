const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'happy', category: 'anime',
  description: 'Anime happy face',
  usage: '.happy',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'happy', '😄 Happy~'),
};
