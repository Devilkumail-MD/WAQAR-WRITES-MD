// commands/reactions/facepalm.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'facepalm',
  aliases: [],
  category: 'reactions',
  description: 'Facepalm reaction',
  usage: '.facepalm',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "facepalm",
      fallbackAction: null,
      verbs: ["is facepalming at"],
      emoji: "🤦",
      requireTarget: false,
      soloMessage: "@me is facepalming 🤦",
      usage: '.facepalm'
    });
  }
};
