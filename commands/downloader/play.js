const yts = (() => { try { return require('yt-search'); } catch(_) { return null; } })();
const ytdl = (() => { try { return require('@distube/ytdl-core'); } catch(_) { try { return require('ytdl-core'); } catch(_) { return null; } } })();
module.exports = {
  name: 'play', aliases: ['song','songs'], category: 'downloader',
  description: 'Search YouTube and send the audio',
  usage: '.play <song name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .play despacito');
    if (!yts || !ytdl) return extra.reply('❌ Required modules missing.');
    try {
      const r = await yts(q);
      const v = r.videos?.[0];
      if (!v) return extra.reply('❌ No results.');
      await extra.reply('🎵 Downloading: ' + v.title + ' (' + v.timestamp + ')\n🔗 ' + v.url);
      const stream = ytdl(v.url, { filter: 'audioonly', quality: 'highestaudio' });
      const chunks = [];
      stream.on('data', c => chunks.push(c));
      stream.on('end', async () => {
        const buf = Buffer.concat(chunks);
        await sock.sendMessage(extra.from, { audio: buf, mimetype: 'audio/mpeg' }, { quoted: msg });
      });
      stream.on('error', e => extra.reply('❌ ' + e.message));
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
