// commands/reactions/kill.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'kill',
  aliases: [],
  category: 'reactions',
  description: 'Kill reaction',
  usage: '.kill @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "kill",
      fallbackAction: null,
      verbs: ["killed","murdered","ended"],
      emoji: "🔪",
      requireTarget: true,
      soloMessage: null,
      usage: '.kill @user'
    });
  }
};
