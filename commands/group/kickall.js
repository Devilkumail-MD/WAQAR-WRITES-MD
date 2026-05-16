module.exports = {
  name: 'kickall', aliases: [], category: 'group',
  description: 'Remove all non-admin members from the group', usage: '.kickall',
  groupOnly: true, adminOnly: true, botAdminNeeded: true, ownerOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const botNum = (sock.user?.id||'').split(':')[0].split('@')[0];
      const targets = (meta.participants||[])
        .filter(p => !p.admin && !p.id.startsWith(botNum))
        .map(p => p.id);
      if (!targets.length) return extra.reply('No non-admin members.');
      await extra.reply('⚠️ Removing ' + targets.length + ' members...');
      for (const t of targets) {
        try { await sock.groupParticipantsUpdate(extra.from, [t], 'remove'); await new Promise(r=>setTimeout(r,800)); } catch (_) {}
      }
      extra.reply('✅ Done.');
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
