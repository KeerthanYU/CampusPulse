import intents from "./intents.json" assert { type: "json" };
import { normalizeText } from "./intentUtils.js";

export function detectIntent(message) {
  const normalized = normalizeText(message);

  for (const intent in intents) {
    if (intents[intent].some(keyword => normalized.includes(keyword))) {
      return intent;
    }
  }
  return "unknown";
}
