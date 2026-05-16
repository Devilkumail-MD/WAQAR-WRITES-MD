// commands/reactions/spank.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'spank',
  aliases: [],
  category: 'reactions',
  description: 'Spank reaction',
  usage: '.spank @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "bully",
      fallbackAction: null,
      verbs: ["spanked"],
      emoji: "🍑",
      requireTarget: true,
      soloMessage: null,
      usage: '.spank @user'
    });
  }
};
