// commands/reactions/throw.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'throw',
  aliases: [],
  category: 'reactions',
  description: 'Throw reaction',
  usage: '.throw @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "yeet",
      fallbackAction: null,
      verbs: ["threw","tossed"],
      emoji: "🎯",
      requireTarget: true,
      soloMessage: null,
      usage: '.throw @user'
    });
  }
};
