module.exports = {
  name: '😀', aliases: ['😂','😎','😍','😢','😡','👍','👎','❤️','🔥','💯'], category: 'general',
  description: 'Bot reacts back with the same emoji',
  usage: '.😀 (reply to a message)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const emoji = msg.message?.conversation?.replace(/^\.\s*/,'') ||
                  msg.message?.extendedTextMessage?.text?.replace(/^\.\s*/,'') || '👍';
    const targetKey = ctx?.stanzaId ? { remoteJid: extra.from, id: ctx.stanzaId, participant: ctx.participant } : msg.key;
    try { await sock.sendMessage(extra.from, { react: { text: emoji.trim().slice(0,3), key: targetKey } }); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
