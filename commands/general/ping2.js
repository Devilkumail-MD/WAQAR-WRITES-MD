module.exports = {
  name: 'ping2', aliases: ['speed'], category: 'general',
  description: 'Detailed bot speed test',
  usage: '.ping2',
  async execute(sock, msg, args, extra) {
    const samples = [];
    for (let i = 0; i < 3; i++) {
      const t = Date.now();
      await sock.sendPresenceUpdate('available', extra.from);
      samples.push(Date.now() - t);
    }
    const avg = Math.round(samples.reduce((a,b)=>a+b,0) / samples.length);
    extra.reply('⚡ *Speed Test*\n\n• Sample 1: ' + samples[0] + 'ms\n• Sample 2: ' + samples[1] + 'ms\n• Sample 3: ' + samples[2] + 'ms\n• Average: ' + avg + 'ms');
  }
};
