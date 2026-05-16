const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
module.exports = {
  name: 'video2img', aliases: ['v2i'], category: 'media',
  description: 'Extract first frame from a video as image',
  usage: '.video2img (reply to video)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const q = ctx?.quotedMessage;
    if (!q?.videoMessage) return extra.reply('🎬 Reply to a video with .video2img');
    try {
      const buf = await downloadMediaMessage({ key:{remoteJid:extra.from,id:ctx.stanzaId,participant:ctx.participant}, message:q }, 'buffer', {});
      const tmp = require('os').tmpdir();
      const inFile = path.join(tmp, 'in_'+Date.now()+'.mp4');
      const outFile = path.join(tmp, 'out_'+Date.now()+'.jpg');
      fs.writeFileSync(inFile, buf);
      await new Promise((res, rej) => {
        const ff = spawn('ffmpeg', ['-y','-i',inFile,'-vframes','1','-q:v','2',outFile]);
        ff.on('close', c => c===0 ? res() : rej(new Error('ffmpeg failed')));
        ff.on('error', rej);
      });
      const out = fs.readFileSync(outFile);
      await sock.sendMessage(extra.from, { image: out, caption: '🖼️ First frame' }, { quoted: msg });
      try { fs.unlinkSync(inFile); fs.unlinkSync(outFile); } catch (_) {}
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
