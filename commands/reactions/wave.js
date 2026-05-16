// commands/reactions/wave.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'wave',
  aliases: [],
  category: 'reactions',
  description: 'Wave reaction',
  usage: '.wave',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "wave",
      fallbackAction: null,
      verbs: ["waved at","greeted"],
      emoji: "👋",
      requireTarget: false,
      soloMessage: "@me waves at everyone 👋",
      usage: '.wave'
    });
  }
};
