import { useState, useEffect, useRef } from 'react';

const AITherapist = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Aura, your AI wellness companion. How can I help you today?", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState('');
  const chatEndRef = useRef(null);

  const moods = ['Anxious', 'Sad', 'Stressed', 'Angry', 'Lonely', 'Happy'];
  const copingStrategies = {
    Anxious: "Let's try deep breathing. Breathe in for 4 counts, hold for 4, exhale for 6.",
    Sad: "It's okay to feel this way. Let's explore three things you're grateful for today.",
    Stressed: "How about a quick body scan meditation? Let's focus on relaxing each muscle group.",
    Angry: "Let's try progressive muscle relaxation. Tighten and release each muscle group slowly.",
    Lonely: "Remember you're not alone. Let's explore ways to connect with supportive communities.",
    Happy: "Wonderful! Let's explore ways to maintain and cultivate this positive state."
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSend = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: generateAIResponse(inputMessage),
        isUser: false
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message) => {
    // In real implementation, replace with API call
    const responses = [
      "That sounds important. Can you tell me more about how that makes you feel?",
      "I appreciate you sharing that. What would you say is the root of this feeling?",
      "Let's explore that further. When did you first notice feeling this way?",
      "How has this been affecting your daily activities?",
      "What do you think might help improve this situation?",
      "Let's try reframing that thought. What's another perspective you could consider?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Wellness Companion</h1>
          <p className="text-gray-600">24/7 emotional support and coping strategies</p>
        </div>

        {/* Mood Tracker */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-3">Current Mood Check-in</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-full ${
                  mood === m 
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {mood && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800">{copingStrategies[mood]}</p>
            </div>
          )}
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-sm h-64 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleMessageSend()}
                placeholder="Type your thoughts..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleMessageSend}
                disabled={isLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Note: This AI companion provides general support and is not a replacement for professional care.
        </p>
      </div>
    </div>
  );
};

export default AITherapist;