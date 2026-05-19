// ============================================================================
// WAQAR WRITES MD - .setbotname (LOCKED)
// Bot identity is permanent and cannot be changed via this command anymore.
// ============================================================================
module.exports = {
  name: 'setbotname',
  aliases: ['setname', 'changebotname'],
  category: 'owner',
  description: 'Bot name is permanently locked and cannot be changed.',
  usage: '.setbotname',
  ownerOnly: true,
  async execute(sock, msg, args, ctx) {
    const config = require('../../config');
    return ctx.reply(
      '🔒 *Bot name permanently locked.*\n\n' +
      'Bot ka naam ab kisi bhi command ya environment variable se change nahi ho sakta.\n\n' +
      `Current name: *${config.botName}*`
    );
  },
};
