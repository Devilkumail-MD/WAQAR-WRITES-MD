// commands/reactions/richrate.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'richrate',
  aliases: [],
  category: 'reactions',
  description: 'richrate rating (reply or mention a user)',
  usage: '.richrate (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "💰",
      max: 100,
      suffix: "%",
      messages: ["@user is {v} rich 💸","Wealth scan: @user = {v}","@user's rich-meter says {v}"]
    });
  }
};
