// commands/reactions/cry.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'cry',
  aliases: [],
  category: 'reactions',
  description: 'Cry reaction',
  usage: '.cry',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "cry",
      fallbackAction: null,
      verbs: ["is crying"],
      emoji: "😭",
      requireTarget: false,
      soloMessage: "@me is crying 😭",
      usage: '.cry'
    });
  }
};
