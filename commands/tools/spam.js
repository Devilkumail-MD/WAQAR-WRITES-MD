module.exports = {
  name: 'spam', aliases: [], category: 'tools',
  description: 'Send a message N times (max 10) — owner only to avoid abuse',
  usage: '.spam <count> <message>',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    let n = parseInt(args[0]); const text = args.slice(1).join(' ');
    if (!n || !text) return extra.reply('Usage: .spam 5 Hello');
    n = Math.min(Math.max(n,1), 10);
    for (let i=0;i<n;i++) { try { await sock.sendMessage(extra.from, { text }); await new Promise(r=>setTimeout(r,500)); } catch(_) {} }
  }
};
