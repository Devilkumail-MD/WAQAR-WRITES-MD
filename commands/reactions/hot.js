// commands/reactions/hot.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'hot',
  aliases: [],
  category: 'reactions',
  description: 'hot rating (reply or mention a user)',
  usage: '.hot (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🔥",
      max: 100,
      suffix: "%",
      messages: ["@user is {v} hot 🔥","Hotness rating for @user: {v}","@user — temperature reading: {v} 🌡️"]
    });
  }
};
