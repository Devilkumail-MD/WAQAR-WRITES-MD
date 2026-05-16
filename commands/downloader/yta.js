const ytdl = (() => { try { return require('@distube/ytdl-core'); } catch(_) { try { return require('ytdl-core'); } catch(_) { return null; } } })();
module.exports = {
  name: 'yta', aliases: ["ytaudio"], category: 'downloader',
  description: 'Download YouTube audio (MP3)',
  usage: '.yta <youtube url>',
  async execute(sock, msg, args, extra) {
    const url = args[0];
    if (!url || !/youtu/.test(url)) return extra.reply('Usage: .yta <youtube url>');
    if (!ytdl) return extra.reply('❌ ytdl-core not installed.');
    try {
      const info = await ytdl.getInfo(url);
      await extra.reply('🎵 ' + info.videoDetails.title);
      const stream = ytdl(url, { filter:'audioonly', quality:'highestaudio' });
      const chunks = [];
      stream.on('data', c => chunks.push(c));
      stream.on('end', async () => {
        await sock.sendMessage(extra.from, { audio: Buffer.concat(chunks), mimetype:'audio/mpeg' }, { quoted: msg });
      });
      stream.on('error', e => extra.reply('❌ ' + e.message));
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
