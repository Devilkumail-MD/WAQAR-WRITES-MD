const { sendAnimeImage } = require('../../utils/anime');
const CATS = ['waifu', 'neko', 'shinobu', 'megumin', 'awoo', 'maid', 'cuddle', 'hug', 'pat', 'smile'];
module.exports = {
  name: 'random', aliases: ['randomanime'], category: 'anime',
  description: 'Random SFW anime image from a random category',
  usage: '.random',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, CATS[Math.floor(Math.random() * CATS.length)], '🎲 Random anime'),
};
