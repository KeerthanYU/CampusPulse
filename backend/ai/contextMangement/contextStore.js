const contextMap = new Map();

export function getContext(userId) {
  return contextMap.get(userId) || {};
}

export function setContext(userId, context) {
  contextMap.set(userId, context);
}
