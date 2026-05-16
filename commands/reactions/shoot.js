// commands/reactions/shoot.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'shoot',
  aliases: [],
  category: 'reactions',
  description: 'Shoot reaction',
  usage: '.shoot @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "shoot",
      fallbackAction: null,
      verbs: ["shot"],
      emoji: "🔫",
      requireTarget: true,
      soloMessage: null,
      usage: '.shoot @user'
    });
  }
};
