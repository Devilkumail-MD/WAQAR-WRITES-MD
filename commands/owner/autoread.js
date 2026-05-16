const t = require('../../utils/toggles');
module.exports = {
  name: 'autoread', aliases: [], category: 'owner',
  description: 'Toggle auto-read messages', usage: '.autoread on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const cur = !!t.get('autoread');
    const opt = (args[0]||'').toLowerCase();
    if (!opt) return extra.reply('📖 auto-read messages is currently: ' + (cur?'ON ✅':'OFF ❌') + '\nUsage: .autoread on|off');
    if (opt !== 'on' && opt !== 'off') return extra.reply('Usage: .autoread on|off');
    t.set('autoread', opt === 'on');
    extra.reply('📖 auto-read messages: ' + (opt==='on'?'ENABLED ✅':'DISABLED ❌'));
  }
};
