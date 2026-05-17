/**
 * In-memory message cache for antidelete.
 * Stores the last N messages per chat with bounded total memory.
 * Cache is lost on bot restart (acceptable trade-off vs. disk I/O on every msg).
 */

const MAX_PER_CHAT = 200;     // last N messages per chat
const MAX_CHATS    = 500;     // max chats tracked (LRU)
const TTL_MS       = 6 * 60 * 60 * 1000; // 6h

// chatJid -> Map<msgId, { ts, key, message, sender, pushName }>
const store = new Map();

function touch(chatJid) {
  // LRU: re-insert to move to end
  const v = store.get(chatJid);
  if (v) { store.delete(chatJid); store.set(chatJid, v); }
  return v;
}

function save(msg) {
  try {
    if (!msg || !msg.key || !msg.key.id || !msg.message) return;
    if (msg.key.fromMe) return;                 // ignore bot's own messages
    if (msg.message.protocolMessage) return;    // ignore revoke/system
    const chatJid = msg.key.remoteJid;
    if (!chatJid) return;

    let chat = store.get(chatJid);
    if (!chat) {
      chat = new Map();
      store.set(chatJid, chat);
      // LRU eviction of oldest chat
      if (store.size > MAX_CHATS) {
        const oldest = store.keys().next().value;
        store.delete(oldest);
      }
    } else {
      touch(chatJid);
    }

    chat.set(msg.key.id, {
      ts: Date.now(),
      key: msg.key,
      message: msg.message,
      sender: msg.key.participant || msg.key.remoteJid,
      pushName: msg.pushName || 'Unknown',
    });

    // cap per-chat size
    if (chat.size > MAX_PER_CHAT) {
      const oldestId = chat.keys().next().value;
      chat.delete(oldestId);
    }
  } catch { /* never crash the bot */ }
}

function get(chatJid, msgId) {
  const chat = store.get(chatJid);
  if (!chat) return null;
  const m = chat.get(msgId);
  if (!m) return null;
  if (Date.now() - m.ts > TTL_MS) { chat.delete(msgId); return null; }
  touch(chatJid);
  return m;
}

function remove(chatJid, msgId) {
  const chat = store.get(chatJid);
  if (chat) chat.delete(msgId);
}

function stats() {
  let total = 0;
  for (const c of store.values()) total += c.size;
  return { chats: store.size, messages: total };
}

// periodic cleanup (every 30 min)
setInterval(() => {
  const cutoff = Date.now() - TTL_MS;
  for (const [chatJid, chat] of store) {
    for (const [id, m] of chat) if (m.ts < cutoff) chat.delete(id);
    if (chat.size === 0) store.delete(chatJid);
  }
}, 30 * 60 * 1000).unref?.();

module.exports = { save, get, remove, stats };
