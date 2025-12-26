const handleSend = async () => {
  const aiResponse = await sendMessageToAI(userMessage);

  setMessages(prev => [
    ...prev,
    { sender: "user", text: userMessage },
    { sender: "ai", text: aiResponse.reply }
  ]);

  setUserMessage("");
};
