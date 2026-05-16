// commands/reactions/iq.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'iq',
  aliases: [],
  category: 'reactions',
  description: 'iq rating (reply or mention a user)',
  usage: '.iq (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🧠",
      max: 200,
      suffix: "",
      messages: ["@user's IQ is {v} 🧠","Brain scan complete: @user = {v} IQ","Galaxy brain check — @user: {v} IQ"]
    });
  }
};
