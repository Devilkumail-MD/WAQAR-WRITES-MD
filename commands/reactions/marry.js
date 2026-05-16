// commands/reactions/marry.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'marry',
  aliases: [],
  category: 'reactions',
  description: 'Marry reaction',
  usage: '.marry @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me proposed to @user! Will they say yes? 💍","🔔 Wedding bells! @me just married @user! 💒","@me and @user just tied the knot! 🥂"],
      emoji: "💍",
      requireTarget: true
    });
  }
};
