const yts = (() => { try { return require('yt-search'); } catch (_) { return null; } })();
module.exports = {
  name: 'yts', aliases: ['ytsearch'], category: 'search',
  description: 'Search YouTube',
  usage: '.yts <query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .yts <query>');
    if (!yts) return extra.reply('❌ yt-search not installed.');
    try {
      const r = await yts(q);
      const list = (r.videos||[]).slice(0,5);
      if (!list.length) return extra.reply('❌ No results.');
      const text = '🔎 *YouTube Search:* ' + q + '\n\n' + list.map((v,i) =>
        (i+1)+'. *'+v.title+'*\n   👁 ' + v.views + ' | ⏱ ' + v.timestamp + '\n   👤 ' + v.author.name + '\n   🔗 ' + v.url
      ).join('\n\n');
      const thumb = list[0].thumbnail;
      if (thumb) await sock.sendMessage(extra.from, { image: { url: thumb }, caption: text }, { quoted: msg });
      else extra.reply(text);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
