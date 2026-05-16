// commands/reactions/boop.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'boop',
  aliases: [],
  category: 'reactions',
  description: 'Boop reaction',
  usage: '.boop @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me boops @user's nose 👉👃","*boop* — @me booped @user 😊","@user just got booped by @me 👃✨"],
      emoji: "👉",
      requireTarget: true
    });
  }
};
