const axios = require('axios');
module.exports = {
  name: 'tubidy', aliases: [], category: 'downloader',
  description: 'Search Tubidy for songs',
  usage: '.tubidy <query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .tubidy <query>');
    extra.reply('🎵 Searching Tubidy: ' + q + '\n🔗 https://tubidy.cool/search?q=' + encodeURIComponent(q) + '\n\nNote: Tubidy direct download requires manual click; bot can list results only.');
  }
};
