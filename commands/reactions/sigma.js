// commands/reactions/sigma.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'sigma',
  aliases: [],
  category: 'reactions',
  description: 'sigma rating (reply or mention a user)',
  usage: '.sigma (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🗿",
      max: 100,
      suffix: "%",
      messages: ["@user is {v} sigma 🗿","Sigma scan: @user = {v}","@user grindset level: {v}"]
    });
  }
};
