// commands/reactions/headpat.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'headpat',
  aliases: [],
  category: 'reactions',
  description: 'Headpat reaction',
  usage: '.headpat @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "pat",
      fallbackAction: null,
      verbs: ["headpatted","gave a headpat to"],
      emoji: "🫳",
      requireTarget: true,
      soloMessage: null,
      usage: '.headpat @user'
    });
  }
};
