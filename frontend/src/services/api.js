export const sendMessage = async (message) => {
  // Placeholder until backend is connected
  return `You said: "${message}"`;
};

// Simulated backend call that returns student records.
// If the caller role is 'administrative' we simulate an authorization
// block (HTTP 403) to demonstrate frontend handling of unauthorized access.
export const getStudentRecords = async (callerRole) => {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 400));

  if (callerRole === 'administrative') {
    const err = new Error('Access denied');
    err.status = 403;
    throw err;
  }

  // return sample data for permitted roles
  return [
    { id: 'S001', name: 'Alice Johnson', year: '2nd' },
    { id: 'S002', name: 'Bob Patel', year: '3rd' },
  ];
};

export default { sendMessage, getStudentRecords };
