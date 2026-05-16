module.exports = {
  name: 'plaky', aliases: [], category: 'downloader',
  description: 'Play media (alias for .play)',
  usage: '.plaky <song>',
  async execute(sock, msg, args, extra) {
    const h = require('./play');
    return h.execute(sock, msg, args, extra);
  }
};
