const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'cry', category: 'anime',
  description: 'Anime crying',
  usage: '.cry',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'cry', '😭 *cries*'),
};
