// commands/reactions/stare.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'stare',
  aliases: [],
  category: 'reactions',
  description: 'Stare reaction',
  usage: '.stare @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "stare",
      fallbackAction: null,
      verbs: ["is staring at","glared at"],
      emoji: "👀",
      requireTarget: true,
      soloMessage: null,
      usage: '.stare @user'
    });
  }
};
