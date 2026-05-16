// commands/reactions/smug.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'smug',
  aliases: [],
  category: 'reactions',
  description: 'Smug reaction',
  usage: '.smug',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "smug",
      fallbackAction: null,
      verbs: ["is smug at"],
      emoji: "😏",
      requireTarget: false,
      soloMessage: "@me looks smug 😏",
      usage: '.smug'
    });
  }
};
