const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'bonk', category: 'anime',
  description: 'Bonk! (anime style)',
  usage: '.bonk',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'bonk', '🔨 BONK!'),
};
