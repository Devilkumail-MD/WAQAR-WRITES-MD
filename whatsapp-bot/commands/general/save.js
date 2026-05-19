// ============================================================================
// WAQAR WRITES MD - .save command
// Reply to any media (status / DM / group) → bot DMs that media to you privately.
// ============================================================================
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

const MEDIA_TYPES = [
  'imageMessage',
  'videoMessage',
  'audioMessage',
  'documentMessage',
  'documentWithCaptionMessage',
  'stickerMessage',
  'viewOnceMessage',
  'viewOnceMessageV2',
  'viewOnceMessageV2Extension',
  'ephemeralMessage',
];

function unwrap(m) {
  if (!m) return null;
  if (m.ephemeralMessage) return unwrap(m.ephemeralMessage.message);
  if (m.viewOnceMessage) return unwrap(m.viewOnceMessage.message);
  if (m.viewOnceMessageV2) return unwrap(m.viewOnceMessageV2.message);
  if (m.viewOnceMessageV2Extension) return unwrap(m.viewOnceMessageV2Extension.message);
  if (m.documentWithCaptionMessage) return unwrap(m.documentWithCaptionMessage.message);
  return m;
}

function pickMedia(m) {
  if (!m) return null;
  if (m.imageMessage) return { type: 'image', node: m.imageMessage };
  if (m.videoMessage) return { type: 'video', node: m.videoMessage };
  if (m.audioMessage) return { type: 'audio', node: m.audioMessage };
  if (m.stickerMessage) return { type: 'sticker', node: m.stickerMessage };
  if (m.documentMessage) return { type: 'document', node: m.documentMessage };
  return null;
}

module.exports = {
  name: 'save',
  aliases: ['take', 'grab'],
  category: 'general',
  description: 'Reply to any status/DM/group media with .save — bot DMs that media to your inbox.',
  usage: '.save (reply to a photo / video / audio / document / sticker)',
  async execute(sock, msg, args, ctx) {
    const from = msg.key.remoteJid;
    // Sender JID — works in DM, group and status
    const senderJid = (msg.key.fromMe
      ? (sock.user?.id || '').split(':')[0] + '@s.whatsapp.net'
      : (msg.key.participant || from)
    ).replace(/:\d+@/, '@');

    // Find the quoted message context
    const ctxInfo =
      msg.message?.extendedTextMessage?.contextInfo ||
      msg.message?.imageMessage?.contextInfo ||
      msg.message?.videoMessage?.contextInfo ||
      msg.message?.documentMessage?.contextInfo ||
      msg.message?.stickerMessage?.contextInfo ||
      msg.message?.audioMessage?.contextInfo ||
      null;

    const quoted = ctxInfo?.quotedMessage;
    if (!quoted) {
      return ctx.reply('❌ Kisi photo / video / audio / sticker / document pe reply karke `.save` likho.');
    }

    const unwrapped = unwrap(quoted);
    const picked = pickMedia(unwrapped);
    if (!picked) {
      return ctx.reply('❌ Iss message me koi media nahi mila. Kisi media (image/video/audio/sticker/doc) pe reply karo.');
    }

    // Build a pseudo-msg for downloadMediaMessage
    const stanzaId = ctxInfo.stanzaId || ctxInfo.stanzaID;
    const participant = ctxInfo.participant || ctxInfo.remoteJid || from;
    const fakeMsg = {
      key: {
        remoteJid: from,
        fromMe: false,
        id: stanzaId,
        participant,
      },
      message: quoted,
    };

    try {
      await sock.sendMessage(from, { react: { text: '⏳', key: msg.key } });

      const buffer = await downloadMediaMessage(
        fakeMsg,
        'buffer',
        {},
        { logger: undefined, reuploadRequest: sock.updateMediaMessage }
      );

      if (!buffer || !buffer.length) {
        return ctx.reply('❌ Media download nahi ho saka. Dobara try karo.');
      }

      const caption = '*WAQAR WRITES MD — Saved Media*';
      const node = picked.node || {};
      const mimetype = node.mimetype || undefined;

      let payload;
      if (picked.type === 'image') {
        payload = { image: buffer, caption, mimetype: mimetype || 'image/jpeg' };
      } else if (picked.type === 'video') {
        payload = { video: buffer, caption, mimetype: mimetype || 'video/mp4' };
      } else if (picked.type === 'audio') {
        payload = {
          audio: buffer,
          mimetype: mimetype || 'audio/mp4',
          ptt: !!node.ptt,
        };
      } else if (picked.type === 'sticker') {
        payload = { sticker: buffer };
      } else if (picked.type === 'document') {
        payload = {
          document: buffer,
          mimetype: mimetype || 'application/octet-stream',
          fileName: node.fileName || 'file',
          caption,
        };
      } else {
        return ctx.reply('❌ Iss media type ko save karna abhi support nahi.');
      }

      // DM the media to the requester
      await sock.sendMessage(senderJid, payload);

      // Confirm
      await sock.sendMessage(from, { react: { text: '✅', key: msg.key } });
      if (from !== senderJid) {
        await ctx.reply('✅ Media aapke inbox me bhej diya.');
      }
    } catch (err) {
      try { await sock.sendMessage(from, { react: { text: '❌', key: msg.key } }); } catch {}
      console.error('[save] error:', err);
      return ctx.reply('❌ Error: ' + (err.message || 'media save failed'));
    }
  },
};
