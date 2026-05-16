// commands/reactions/cuddle.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'cuddle',
  aliases: [],
  category: 'reactions',
  description: 'Cuddle reaction',
  usage: '.cuddle @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "cuddle",
      fallbackAction: null,
      verbs: ["cuddled with","snuggled"],
      emoji: "🥰",
      requireTarget: true,
      soloMessage: null,
      usage: '.cuddle @user'
    });
  }
};
