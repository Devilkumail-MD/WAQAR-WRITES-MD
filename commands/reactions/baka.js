// commands/reactions/baka.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'baka',
  aliases: [],
  category: 'reactions',
  description: 'Baka reaction',
  usage: '.baka @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "baka",
      fallbackAction: null,
      verbs: ["called BAKA","b-baka'd"],
      emoji: "🙄",
      requireTarget: true,
      soloMessage: null,
      usage: '.baka @user'
    });
  }
};
