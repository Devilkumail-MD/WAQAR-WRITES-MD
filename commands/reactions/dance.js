// commands/reactions/dance.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'dance',
  aliases: [],
  category: 'reactions',
  description: 'Dance reaction',
  usage: '.dance',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "dance",
      fallbackAction: null,
      verbs: ["is dancing"],
      emoji: "💃",
      requireTarget: false,
      soloMessage: "@me is dancing 💃",
      usage: '.dance'
    });
  }
};
