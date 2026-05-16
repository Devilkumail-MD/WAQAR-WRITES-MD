/**
 * .setchatbot <prompt>
 * Owner-only. Sets the custom AI prompt used by the chatbot.
 * Use `.setchatbot reset` (or `.setchatbot default`) to restore the default prompt.
 * Use `.setchatbot show` to view the current prompt.
 */

const chatbot = require('./chatbot');

module.exports = {
  name: 'setchatbot',
  aliases: ['chatbotprompt', 'setbotprompt'],
  category: 'admin',
  description: 'Set a custom AI prompt for the chatbot (owner only)',
  usage: '.setchatbot <prompt> | .setchatbot show | .setchatbot reset',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    if (!extra.isOwner) {
      return extra.reply('👑 This command is only for the bot owner.');
    }

    const raw = (args || []).join(' ').trim();

    if (!raw) {
      return extra.reply(
        '🧠 *SET CHATBOT PROMPT*\n\n' +
        '*Usage:*\n' +
        '• `.setchatbot <your prompt>` — set a custom personality / instructions\n' +
        '• `.setchatbot show` — view the current prompt\n' +
        '• `.setchatbot reset` — restore the default prompt\n\n' +
        '*Example:*\n' +
        '`.setchatbot Tum Waqar ho. Sirf Urdu mein chhoti baat karo, dosti ke andaz mein.`'
      );
    }

    const sub = raw.toLowerCase();

    if (sub === 'show' || sub === 'view') {
      const current = chatbot.getPrompt();
      return extra.reply('🧠 *Current chatbot prompt:*\n\n```\n' + current + '\n```');
    }

    if (sub === 'reset' || sub === 'default' || sub === 'clear') {
      chatbot.setPrompt(null);
      return extra.reply('✅ Chatbot prompt reset to *default*.');
    }

    chatbot.setPrompt(raw);
    return extra.reply(
      '✅ *Chatbot prompt updated!*\n\n' +
      '*New prompt:*\n```\n' + raw + '\n```\n\n' +
      'It will take effect on the next chatbot reply.'
    );
  },
};
