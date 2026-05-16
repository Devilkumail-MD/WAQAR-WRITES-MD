// commands/reactions/nom.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'nom',
  aliases: [],
  category: 'reactions',
  description: 'Nom reaction',
  usage: '.nom @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "nom",
      fallbackAction: null,
      verbs: ["nommed on","ate"],
      emoji: "🍴",
      requireTarget: true,
      soloMessage: null,
      usage: '.nom @user'
    });
  }
};
