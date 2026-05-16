// commands/reactions/blush.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'blush',
  aliases: [],
  category: 'reactions',
  description: 'Blush reaction',
  usage: '.blush',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "blush",
      fallbackAction: null,
      verbs: ["is blushing at"],
      emoji: "😊",
      requireTarget: false,
      soloMessage: "@me is blushing 😳",
      usage: '.blush'
    });
  }
};
