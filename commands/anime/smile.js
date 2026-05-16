const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'smile', category: 'anime',
  description: 'Anime smile',
  usage: '.smile',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'smile', '😊 *smiles*'),
};
