// commands/reactions/love.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'love',
  aliases: [],
  category: 'reactions',
  description: 'Love reaction',
  usage: '.love @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me loves @user with all their heart ❤️","@me sends infinite love to @user 💕","@user, @me has something to say… \"I love you!\" 💌"],
      emoji: "❤️",
      requireTarget: true
    });
  }
};
