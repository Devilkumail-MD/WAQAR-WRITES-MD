module.exports = {
  name: 'antimention', aliases: ['antimentions'], category: 'owner',
  description: 'Toggle anti-mention (alias for antigroupmention)',
  usage: '.antimention on|off',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    const handler = require('../admin/antigroupmention');
    return handler.execute(sock, msg, args, extra);
  }
};
