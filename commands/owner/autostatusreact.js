const t = require('../../utils/toggles');
module.exports = {
  name: 'autostatusreact', aliases: [], category: 'owner',
  description: 'Toggle auto-react to status updates', usage: '.autostatusreact on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const cur = !!t.get('autostatusreact');
    const opt = (args[0]||'').toLowerCase();
    if (!opt) return extra.reply('💖 auto-react to status updates is currently: ' + (cur?'ON ✅':'OFF ❌') + '\nUsage: .autostatusreact on|off');
    if (opt !== 'on' && opt !== 'off') return extra.reply('Usage: .autostatusreact on|off');
    t.set('autostatusreact', opt === 'on');
    extra.reply('💖 auto-react to status updates: ' + (opt==='on'?'ENABLED ✅':'DISABLED ❌'));
  }
};
