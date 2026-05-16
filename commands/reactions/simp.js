// commands/reactions/simp.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'simp',
  aliases: [],
  category: 'reactions',
  description: 'simp rating (reply or mention a user)',
  usage: '.simp (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "😍",
      max: 100,
      suffix: "%",
      messages: ["@user is {v} simp 😍","Simp detector for @user: {v}","@user, your simp level is {v}"]
    });
  }
};
