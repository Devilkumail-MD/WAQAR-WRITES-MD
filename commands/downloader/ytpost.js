const yts = (() => { try { return require('yt-search'); } catch(_) { return null; } })();
module.exports = {
  name: 'ytpost', aliases: ['ytinfo'], category: 'downloader',
  description: 'Get YouTube video info',
  usage: '.ytpost <youtube url|query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .ytpost <url or query>');
    if (!yts) return extra.reply('❌ yt-search not installed.');
    try {
      let v;
      if (/youtu/.test(q)) {
        const id = (q.match(/(?:v=|youtu\.be\/)([\w-]+)/)||[])[1];
        if (id) v = (await yts({ videoId: id }));
      }
      if (!v) v = (await yts(q)).videos?.[0];
      if (!v) return extra.reply('❌ Not found.');
      const cap = '📺 *' + v.title + '*\n\n👤 ' + (v.author?.name||'-') + '\n👁 ' + (v.views||'-') + '\n⏱ ' + (v.timestamp||'-') + '\n📅 ' + (v.ago||'-') + '\n\n' + (v.description||'').slice(0,500) + '\n\n🔗 ' + v.url;
      if (v.thumbnail) await sock.sendMessage(extra.from, { image:{url:v.thumbnail}, caption: cap }, { quoted: msg });
      else extra.reply(cap);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
