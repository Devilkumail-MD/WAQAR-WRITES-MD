const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'nom', category: 'anime',
  description: 'Nom (anime style)',
  usage: '.nom',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'nom', '🍩 *nom nom*'),
};
