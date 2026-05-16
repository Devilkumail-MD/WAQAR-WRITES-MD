const t = require('../../utils/toggles');
module.exports = {
  name: 'autorecord', aliases: [], category: 'owner',
  description: 'Toggle auto-recording indicator', usage: '.autorecord on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const cur = !!t.get('autorecord');
    const opt = (args[0]||'').toLowerCase();
    if (!opt) return extra.reply('🎙️ auto-recording indicator is currently: ' + (cur?'ON ✅':'OFF ❌') + '\nUsage: .autorecord on|off');
    if (opt !== 'on' && opt !== 'off') return extra.reply('Usage: .autorecord on|off');
    t.set('autorecord', opt === 'on');
    extra.reply('🎙️ auto-recording indicator: ' + (opt==='on'?'ENABLED ✅':'DISABLED ❌'));
  }
};
