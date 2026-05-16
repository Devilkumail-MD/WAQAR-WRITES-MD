// commands/reactions/hug.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'hug',
  aliases: [],
  category: 'reactions',
  description: 'Hug reaction',
  usage: '.hug @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "hug",
      fallbackAction: null,
      verbs: ["hugged","embraced","squeezed"],
      emoji: "🤗",
      requireTarget: true,
      soloMessage: null,
      usage: '.hug @user'
    });
  }
};
