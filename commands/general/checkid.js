module.exports = {
  name: 'checkid', aliases: ['id','jid'], category: 'general',
  description: 'Show your ID and the chat/group ID',
  usage: '.checkid',
  async execute(sock, msg, args, extra) {
    let txt = '🆔 *ID Info*\n\n';
    txt += '• Your JID: ' + extra.sender + '\n';
    txt += '• Chat JID: ' + extra.from + '\n';
    txt += '• Is Group: ' + (extra.isGroup ? 'Yes':'No') + '\n';
    if (extra.isGroup && extra.groupMetadata) {
      txt += '• Group Name: ' + extra.groupMetadata.subject + '\n';
      txt += '• Members: ' + (extra.groupMetadata.participants?.length || 0);
    }
    extra.reply(txt);
  }
};
