const t = require('../../utils/toggles');
module.exports = {
  name: 'autostatus', aliases: ["autoview"], category: 'owner',
  description: 'Toggle auto-view status updates', usage: '.autostatus on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const cur = !!t.get('autostatus');
    const opt = (args[0]||'').toLowerCase();
    if (!opt) return extra.reply('👀 auto-view status updates is currently: ' + (cur?'ON ✅':'OFF ❌') + '\nUsage: .autostatus on|off');
    if (opt !== 'on' && opt !== 'off') return extra.reply('Usage: .autostatus on|off');
    t.set('autostatus', opt === 'on');
    extra.reply('👀 auto-view status updates: ' + (opt==='on'?'ENABLED ✅':'DISABLED ❌'));
  }
};
