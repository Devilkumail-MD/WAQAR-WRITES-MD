// commands/reactions/dab.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'dab',
  aliases: [],
  category: 'reactions',
  description: 'Dab reaction',
  usage: '.dab',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me hits a massive DAB 🕺","@me dabs into oblivion 💫","DAB! — @me"],
      emoji: "🕺",
      requireTarget: false
    });
  }
};
