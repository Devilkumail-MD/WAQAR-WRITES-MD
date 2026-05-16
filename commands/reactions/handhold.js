// commands/reactions/handhold.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'handhold',
  aliases: [],
  category: 'reactions',
  description: 'Handhold reaction',
  usage: '.handhold @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "handhold",
      fallbackAction: null,
      verbs: ["is holding hands with"],
      emoji: "🤝",
      requireTarget: true,
      soloMessage: null,
      usage: '.handhold @user'
    });
  }
};
