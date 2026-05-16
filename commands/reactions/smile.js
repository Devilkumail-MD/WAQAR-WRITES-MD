// commands/reactions/smile.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'smile',
  aliases: [],
  category: 'reactions',
  description: 'Smile reaction',
  usage: '.smile',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "smile",
      fallbackAction: null,
      verbs: ["is smiling at"],
      emoji: "😊",
      requireTarget: false,
      soloMessage: "@me is smiling 😊",
      usage: '.smile'
    });
  }
};
