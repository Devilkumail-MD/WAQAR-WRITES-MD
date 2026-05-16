// commands/reactions/nuzzle.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'nuzzle',
  aliases: [],
  category: 'reactions',
  description: 'Nuzzle reaction',
  usage: '.nuzzle @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me nuzzles up to @user 😽","@me snuggles into @user 🥺","@user gets a soft nuzzle from @me 😻"],
      emoji: "😽",
      requireTarget: true
    });
  }
};
