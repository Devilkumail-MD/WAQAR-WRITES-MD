const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'wink', category: 'anime',
  description: 'Anime wink',
  usage: '.wink',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'wink', '😉 *winks*'),
};
