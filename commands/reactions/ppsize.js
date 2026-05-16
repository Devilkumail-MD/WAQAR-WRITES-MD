// commands/reactions/ppsize.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'ppsize',
  aliases: [],
  category: 'reactions',
  description: 'ppsize rating (reply or mention a user)',
  usage: '.ppsize (reply or @user)',

  async execute(sock, msg, args, extra) {
    return reaction.rate(sock, msg, extra, {
      emoji: "🍆",
      max: 30,
      suffix: " cm",
      messages: ["@user's pp size is {v} 😳","PP-meter result for @user: {v}","Scientifically measured — @user: {v}"]
    });
  }
};
