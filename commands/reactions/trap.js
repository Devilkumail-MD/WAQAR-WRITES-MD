// commands/reactions/trap.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'trap',
  aliases: [],
  category: 'reactions',
  description: 'Trap reaction',
  usage: '.trap @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me set a trap for @user 🪤","@user just walked into @me's trap! 😈","It's a trap! @me caught @user 🪤"],
      emoji: "🪤",
      requireTarget: true
    });
  }
};
