module.exports = {
  name: 'imageinfo', aliases: [], category: 'media',
  description: 'Show info about a replied image',
  usage: '.imageinfo (reply to image)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const im = ctx?.quotedMessage?.imageMessage;
    if (!im) return extra.reply('🖼️ Reply to an image with .imageinfo');
    const txt = '🖼️ *Image Info*\n\n• Size: ' + Math.round((im.fileLength||0)/1024) + ' KB\n• Dimensions: ' + (im.width||'-') + 'x' + (im.height||'-') + '\n• MIME: ' + (im.mimetype||'-') + '\n• Caption: ' + (im.caption||'(none)');
    extra.reply(txt);
  }
};
