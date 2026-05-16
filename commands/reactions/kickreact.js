// commands/reactions/kickreact.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'kickreact',
  aliases: [],
  category: 'reactions',
  description: 'Kickreact reaction',
  usage: '.kickreact @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "kick",
      fallbackAction: null,
      verbs: ["kicked","booted"],
      emoji: "🦵",
      requireTarget: true,
      soloMessage: null,
      usage: '.kickreact @user'
    });
  }
};
