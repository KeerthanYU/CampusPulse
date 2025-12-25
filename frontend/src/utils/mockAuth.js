// mockAuth.js - lightweight mock authentication
// This simulates server authentication and returns a simple user object.

export const mockLogin = async (email, password) => {
  // fake latency
  await new Promise(r => setTimeout(r, 350));

  // very simple validation
  if (!email || !password) throw new Error('Invalid credentials');

  // derive name from email local part
  const local = email.split('@')[0] || 'user';
  const name = local.charAt(0).toUpperCase() + local.slice(1);

  return { email, name };
};

export default { mockLogin };
