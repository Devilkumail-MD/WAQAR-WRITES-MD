// commands/reactions/bite.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'bite',
  aliases: [],
  category: 'reactions',
  description: 'Bite reaction',
  usage: '.bite @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "bite",
      fallbackAction: null,
      verbs: ["bit","chomped on"],
      emoji: "😬",
      requireTarget: true,
      soloMessage: null,
      usage: '.bite @user'
    });
  }
};
