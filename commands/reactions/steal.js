// commands/reactions/steal.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'steal',
  aliases: [],
  category: 'reactions',
  description: 'Steal reaction',
  usage: '.steal @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me stole something from @user 🥷","@me ran off with @user's wallet 💸","@user got robbed by @me 🏃‍♂️💨"],
      emoji: "🥷",
      requireTarget: true
    });
  }
};
