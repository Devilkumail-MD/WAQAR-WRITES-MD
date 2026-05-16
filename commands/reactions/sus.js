// commands/reactions/sus.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'sus',
  aliases: [],
  category: 'reactions',
  description: 'sus rating (reply or mention a user)',
  usage: '.sus (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🟥",
      max: 100,
      suffix: "%",
      messages: ["@user is {v} sus 🟥","Among us scan — @user: {v} sus","@user is acting {v} sus 👀"]
    });
  }
};
