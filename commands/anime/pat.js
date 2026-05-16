const { sendAnimeImage } = require('../../utils/anime');
module.exports = {
  name: 'pat', category: 'anime',
  description: 'Pat someone (anime style)',
  usage: '.pat',
  execute: (s, m, a, e) => sendAnimeImage(s, m, e, 'pat', '✋ *pats your head*'),
};
