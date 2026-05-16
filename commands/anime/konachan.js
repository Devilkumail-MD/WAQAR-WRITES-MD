const { sendAnimeImage } = require('../../utils/anime');
const CATS = ['waifu', 'neko', 'shinobu', 'megumin', 'awoo'];
module.exports = {
  name: 'konachan', category: 'anime',
  description: 'Random SFW anime image (alias for random anime art)',
  usage: '.konachan',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, CATS[Math.floor(Math.random() * CATS.length)], '🌸 Random anime art'),
};
