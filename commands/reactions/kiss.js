// commands/reactions/kiss.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'kiss',
  aliases: [],
  category: 'reactions',
  description: 'Kiss reaction',
  usage: '.kiss @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "kiss",
      fallbackAction: null,
      verbs: ["kissed","smooched"],
      emoji: "💋",
      requireTarget: true,
      soloMessage: null,
      usage: '.kiss @user'
    });
  }
};
