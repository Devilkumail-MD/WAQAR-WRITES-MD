// commands/reactions/luck.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'luck',
  aliases: [],
  category: 'reactions',
  description: 'luck rating (reply or mention a user)',
  usage: '.luck (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🍀",
      max: 100,
      suffix: "%",
      messages: ["@user has {v} luck today!","Luck-o-meter for @user: {v}","@user, the universe rates your luck at {v}"]
    });
  }
};
