import axios from "axios";

export const sendMessageToAI = async (message) => {
  const response = await axios.post(
    "http://localhost:5000/api/ai/chat",
    { message },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  );

  return response.data;
};
