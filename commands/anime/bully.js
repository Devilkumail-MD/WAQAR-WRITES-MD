const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'bully', category: 'anime',
  description: 'Anime bully reaction',
  usage: '.bully',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'bully', '😈 *bullies you a little*'),
};
