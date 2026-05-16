module.exports = {
  name: 'mega', aliases: [], category: 'downloader',
  description: 'Download from Mega.nz link (basic public link)',
  usage: '.mega <mega url>',
  async execute(sock, msg, args, extra) {
    const url = args[0];
    if (!url || !/mega\.nz/.test(url)) return extra.reply('Usage: .mega https://mega.nz/...');
    extra.reply('⚠️ Mega downloads require the megajs library and can be very slow / fail in shared hosting. Try the link manually:\n' + url);
  }
};
