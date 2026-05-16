// commands/reactions/smack.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'smack',
  aliases: [],
  category: 'reactions',
  description: 'Smack reaction',
  usage: '.smack @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "slap",
      fallbackAction: null,
      verbs: ["smacked"],
      emoji: "💢",
      requireTarget: true,
      soloMessage: null,
      usage: '.smack @user'
    });
  }
};
