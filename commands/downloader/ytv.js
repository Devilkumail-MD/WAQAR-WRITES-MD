const ytdl = (() => { try { return require('@distube/ytdl-core'); } catch(_) { try { return require('ytdl-core'); } catch(_) { return null; } } })();
module.exports = {
  name: 'ytv', aliases: ["ytvideo"], category: 'downloader',
  description: 'Download YouTube video (MP4)',
  usage: '.ytv <youtube url>',
  async execute(sock, msg, args, extra) {
    const url = args[0];
    if (!url || !/youtu/.test(url)) return extra.reply('Usage: .ytv <youtube url>');
    if (!ytdl) return extra.reply('❌ ytdl-core not installed.');
    try {
      const info = await ytdl.getInfo(url);
      await extra.reply('🎬 ' + info.videoDetails.title);
      const stream = ytdl(url, { quality:'18' }); // 360p mp4
      const chunks = [];
      stream.on('data', c => chunks.push(c));
      stream.on('end', async () => {
        await sock.sendMessage(extra.from, { video: Buffer.concat(chunks), caption: info.videoDetails.title }, { quoted: msg });
      });
      stream.on('error', e => extra.reply('❌ ' + e.message));
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
