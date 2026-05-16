// commands/reactions/flex.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'flex',
  aliases: [],
  category: 'reactions',
  description: 'Flex reaction',
  usage: '.flex',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me flexes hard 💪😤","@me showing off those gains 💪🔥","Look at @me flex! 💪"],
      emoji: "💪",
      requireTarget: false
    });
  }
};
