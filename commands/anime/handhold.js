const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'handhold', category: 'anime',
  description: 'Hand-hold (anime style)',
  usage: '.handhold',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'handhold', '🤝 *holds your hand*'),
};
