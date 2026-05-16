// commands/reactions/respect.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'respect',
  aliases: [],
  category: 'reactions',
  description: 'Respect reaction',
  usage: '.respect @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me salutes @user 🫡 Big respect!","Massive respect from @me to @user 🙇","F to pay respects to @user — from @me 🫡"],
      emoji: "🫡",
      requireTarget: true
    });
  }
};
