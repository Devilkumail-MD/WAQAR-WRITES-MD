const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'hug', category: 'anime',
  description: 'Send an anime hug',
  usage: '.hug',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'hug', '🤗 *hugs you tightly*'),
};
