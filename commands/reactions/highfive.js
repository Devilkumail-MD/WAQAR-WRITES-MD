// commands/reactions/highfive.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'highfive',
  aliases: [],
  category: 'reactions',
  description: 'Highfive reaction',
  usage: '.highfive @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "highfive",
      fallbackAction: null,
      verbs: ["high-fived"],
      emoji: "🙌",
      requireTarget: true,
      soloMessage: null,
      usage: '.highfive @user'
    });
  }
};
