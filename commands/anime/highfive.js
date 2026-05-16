const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'highfive', category: 'anime',
  description: 'High-five (anime style)',
  usage: '.highfive',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'highfive', '🙌 High five!'),
};
