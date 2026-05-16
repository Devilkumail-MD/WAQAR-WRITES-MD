module.exports = {
  name: 'spam2', aliases: [], category: 'tools',
  description: 'Send a message N times to a target (max 10) — owner only',
  usage: '.spam2 <number> <count> <message>',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const num = (args[0]||'').replace(/\D/g,'');
    let n = parseInt(args[1]); const text = args.slice(2).join(' ');
    if (!num || !n || !text) return extra.reply('Usage: .spam2 92xxxxxxxxxx 5 Hello');
    n = Math.min(Math.max(n,1), 10);
    const jid = num + '@s.whatsapp.net';
    for (let i=0;i<n;i++) { try { await sock.sendMessage(jid, { text }); await new Promise(r=>setTimeout(r,800)); } catch(_) {} }
    extra.reply('✅ Sent ' + n + ' message(s) to +' + num);
  }
};
