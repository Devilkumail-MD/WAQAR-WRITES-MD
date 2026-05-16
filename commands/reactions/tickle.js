// commands/reactions/tickle.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'tickle',
  aliases: [],
  category: 'reactions',
  description: 'Tickle reaction',
  usage: '.tickle @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "tickle",
      fallbackAction: null,
      verbs: ["tickled"],
      emoji: "🪶",
      requireTarget: true,
      soloMessage: null,
      usage: '.tickle @user'
    });
  }
};
