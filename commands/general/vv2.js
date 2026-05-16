const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
module.exports = {
  name: 'vv2', aliases: ['vvsend'], category: 'general',
  description: 'Reveal view-once and forward to your DM',
  usage: '.vv2 (reply to view-once)',
  async execute(sock, msg, args, extra) {
    const h = require('./viewonce');
    return h.execute(sock, msg, args, extra);
  }
};
