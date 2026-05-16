// commands/reactions/yeet.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'yeet',
  aliases: [],
  category: 'reactions',
  description: 'Yeet reaction',
  usage: '.yeet @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "yeet",
      fallbackAction: null,
      verbs: ["yeeted"],
      emoji: "🚀",
      requireTarget: true,
      soloMessage: null,
      usage: '.yeet @user'
    });
  }
};
