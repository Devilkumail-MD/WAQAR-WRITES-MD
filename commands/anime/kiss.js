const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'kiss', category: 'anime',
  description: 'Send an anime kiss',
  usage: '.kiss',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'kiss', '😘 *blows a kiss*'),
};
