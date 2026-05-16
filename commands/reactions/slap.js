// commands/reactions/slap.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'slap',
  aliases: [],
  category: 'reactions',
  description: 'Slap reaction',
  usage: '.slap @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "slap",
      fallbackAction: null,
      verbs: ["slapped","smacked"],
      emoji: "👋",
      requireTarget: true,
      soloMessage: null,
      usage: '.slap @user'
    });
  }
};
