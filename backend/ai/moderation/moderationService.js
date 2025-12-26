import bannedWords from "./bannedWords.json" assert { type: "json" };

export function isContentSafe(message) {
  return !bannedWords.some(word => message.toLowerCase().includes(word));
}
