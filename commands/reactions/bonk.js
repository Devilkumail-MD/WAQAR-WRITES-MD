// commands/reactions/bonk.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'bonk',
  aliases: [],
  category: 'reactions',
  description: 'Bonk reaction',
  usage: '.bonk @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "bonk",
      fallbackAction: null,
      verbs: ["bonked","smacked with the bonk hammer"],
      emoji: "🔨",
      requireTarget: true,
      soloMessage: null,
      usage: '.bonk @user'
    });
  }
};
