// commands/reactions/propose.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'propose',
  aliases: [],
  category: 'reactions',
  description: 'Propose reaction',
  usage: '.propose @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me got down on one knee and proposed to @user 💍","@me: \"Will you marry me?\" — @user 💖","A ring, a rose, and a question for @user from @me 🌹💍"],
      emoji: "💖",
      requireTarget: true
    });
  }
};
