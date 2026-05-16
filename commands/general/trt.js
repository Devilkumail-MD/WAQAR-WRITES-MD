module.exports = {
  name: 'trt', aliases: [], category: 'general',
  description: 'Translate text (alias for translate)',
  usage: '.trt <lang> <text>',
  async execute(sock, msg, args, extra) {
    const handler = require('./translate');
    return handler.execute(sock, msg, args, extra);
  }
};
