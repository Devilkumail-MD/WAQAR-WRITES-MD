// commands/reactions/pat.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'pat',
  aliases: [],
  category: 'reactions',
  description: 'Pat reaction',
  usage: '.pat @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "pat",
      fallbackAction: null,
      verbs: ["patted","headpatted"],
      emoji: "🤲",
      requireTarget: true,
      soloMessage: null,
      usage: '.pat @user'
    });
  }
};
