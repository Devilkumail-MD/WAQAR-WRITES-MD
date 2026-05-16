const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'poke', category: 'anime',
  description: 'Poke someone (anime style)',
  usage: '.poke',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'poke', '👉 *pokes*'),
};
