// commands/reactions/feed.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'feed',
  aliases: [],
  category: 'reactions',
  description: 'Feed reaction',
  usage: '.feed @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "feed",
      fallbackAction: null,
      verbs: ["fed","is feeding"],
      emoji: "🍰",
      requireTarget: true,
      soloMessage: null,
      usage: '.feed @user'
    });
  }
};
