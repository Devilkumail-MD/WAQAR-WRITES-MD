const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { spawn } = require('child_process');
const fs = require('fs'); const path = require('path');
module.exports = {
  name: 'tomp3', aliases: ['toaudio'], category: 'tools',
  description: 'Convert a video to MP3 (reply to a video)',
  usage: '.tomp3 (reply to video)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const q = ctx?.quotedMessage;
    const vMsg = q?.videoMessage || msg.message?.videoMessage;
    if (!vMsg) return extra.reply('🎬 Reply to a video with .tomp3');
    try {
      const target = q?.videoMessage ? { key:{remoteJid:extra.from,id:ctx.stanzaId,participant:ctx.participant}, message:q } : msg;
      const buf = await downloadMediaMessage(target, 'buffer', {});
      const tmp = require('os').tmpdir();
      const inFile = path.join(tmp, 'in_'+Date.now()+'.mp4');
      const outFile = path.join(tmp, 'out_'+Date.now()+'.mp3');
      fs.writeFileSync(inFile, buf);
      await new Promise((res, rej) => {
        const ff = spawn('ffmpeg', ['-y','-i',inFile,'-vn','-ab','192k','-ar','44100','-f','mp3',outFile]);
        ff.on('close', c => c===0 ? res() : rej(new Error('ffmpeg failed')));
        ff.on('error', rej);
      });
      const out = fs.readFileSync(outFile);
      await sock.sendMessage(extra.from, { audio: out, mimetype: 'audio/mp4' }, { quoted: msg });
      try { fs.unlinkSync(inFile); fs.unlinkSync(outFile); } catch (_) {}
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
