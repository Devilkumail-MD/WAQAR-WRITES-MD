// commands/reactions/bully.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'bully',
  aliases: [],
  category: 'reactions',
  description: 'Bully reaction',
  usage: '.bully @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "bully",
      fallbackAction: null,
      verbs: ["bullied","picked on"],
      emoji: "😈",
      requireTarget: true,
      soloMessage: null,
      usage: '.bully @user'
    });
  }
};
