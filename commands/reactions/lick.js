// commands/reactions/lick.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'lick',
  aliases: [],
  category: 'reactions',
  description: 'Lick reaction',
  usage: '.lick @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "lick",
      fallbackAction: null,
      verbs: ["licked"],
      emoji: "👅",
      requireTarget: true,
      soloMessage: null,
      usage: '.lick @user'
    });
  }
};
