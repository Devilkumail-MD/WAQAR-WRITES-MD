// commands/reactions/punch.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'punch',
  aliases: [],
  category: 'reactions',
  description: 'Punch reaction',
  usage: '.punch @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "punch",
      fallbackAction: "kick",
      verbs: ["punched","knocked out","jabbed"],
      emoji: "👊",
      requireTarget: true,
      soloMessage: null,
      usage: '.punch @user'
    });
  }
};
