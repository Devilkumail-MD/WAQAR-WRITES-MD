const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'smug', category: 'anime',
  description: 'Smug anime face',
  usage: '.smug',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'smug', '😏 Smug~'),
};
