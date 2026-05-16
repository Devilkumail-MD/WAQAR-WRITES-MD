const axios = require('axios');
module.exports = {
  name: 'lookup', aliases: ['ip','iplookup'], category: 'tools',
  description: 'Lookup info about an IP address or domain',
  usage: '.lookup <ip|domain>',
  async execute(sock, msg, args, extra) {
    const target = args[0];
    if (!target) return extra.reply('Usage: .lookup 8.8.8.8 or .lookup google.com');
    try {
      const r = await axios.get('https://ipwho.is/' + encodeURIComponent(target), { timeout: 10000 });
      const d = r.data;
      if (d.success === false) return extra.reply('❌ Not found: ' + (d.message||''));
      const txt = '🌐 *Lookup Result*\n\n' +
        '• IP: ' + (d.ip||'-') + '\n' +
        '• Type: ' + (d.type||'-') + '\n' +
        '• Country: ' + (d.country||'-') + ' ' + (d.flag?.emoji||'') + '\n' +
        '• Region: ' + (d.region||'-') + '\n' +
        '• City: ' + (d.city||'-') + '\n' +
        '• ISP: ' + (d.connection?.isp||'-') + '\n' +
        '• Org: ' + (d.connection?.org||'-') + '\n' +
        '• Timezone: ' + (d.timezone?.id||'-');
      extra.reply(txt);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
