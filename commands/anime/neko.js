const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'neko', category: 'anime',
  description: 'Random SFW anime neko image',
  usage: '.neko',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'neko', '🐾 Nyaa~ here is a neko'),
};
