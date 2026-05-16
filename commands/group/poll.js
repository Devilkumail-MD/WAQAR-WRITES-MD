module.exports = {
  name: 'poll', aliases: [], category: 'group',
  description: 'Create a poll', usage: '.poll Question | option1, option2, option3',
  groupOnly: true,
  async execute(sock, msg, args, extra) {
    const raw = args.join(' ');
    const [qPart, optPart] = raw.split('|').map(s => s && s.trim());
    if (!qPart || !optPart) return extra.reply('Usage: .poll Your question? | option 1, option 2, option 3');
    const opts = optPart.split(',').map(s => s.trim()).filter(Boolean);
    if (opts.length < 2) return extra.reply('Need at least 2 options separated by commas.');
    try {
      await sock.sendMessage(extra.from, { poll: { name: qPart, values: opts, selectableCount: 1 } });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
