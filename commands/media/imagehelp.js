module.exports = {
  name: 'imagehelp', aliases: [], category: 'media',
  description: 'Show available image-related tools',
  usage: '.imagehelp',
  async execute(sock, msg, args, extra) {
    extra.reply('🖼️ *Image Tools*\n\n• .s / .sticker — image → sticker\n• .toimage / .sticker2img — sticker → image\n• .imageinfo — image metadata\n• .circle — round-crop image\n• .crop — crop image\n• .img <q> — search images\n• .rndimg — random image\n• .video2img — extract frame from video\n• .emojimix 😀+😎 — mix emojis');
  }
};
