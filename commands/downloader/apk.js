const axios = require('axios');
module.exports = {
  name: 'apk', aliases: [], category: 'downloader',
  description: 'Search Android APK (returns store/info link)',
  usage: '.apk <app name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .apk WhatsApp');
    extra.reply('📦 APK info for: ' + q + '\n\n🔗 Play Store: https://play.google.com/store/search?q=' + encodeURIComponent(q) + '&c=apps\n🔗 APKMirror: https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=' + encodeURIComponent(q) + '\n\nNote: Direct APK download requires user-side action.');
  }
};
