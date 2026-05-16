const t = require('../../utils/toggles');
module.exports = {
  name: 'autotyping', aliases: [], category: 'owner',
  description: 'Toggle auto-typing indicator', usage: '.autotyping on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const cur = !!t.get('autotyping');
    const opt = (args[0]||'').toLowerCase();
    if (!opt) return extra.reply('⌨️ auto-typing indicator is currently: ' + (cur?'ON ✅':'OFF ❌') + '\nUsage: .autotyping on|off');
    if (opt !== 'on' && opt !== 'off') return extra.reply('Usage: .autotyping on|off');
    t.set('autotyping', opt === 'on');
    extra.reply('⌨️ auto-typing indicator: ' + (opt==='on'?'ENABLED ✅':'DISABLED ❌'));
  }
};
