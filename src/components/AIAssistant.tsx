import { useState } from "react";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

const suggestions = [
  "Recommend AI talks",
  "Create Frontend Roadmap",
  "Summarize this talk",
  "What should I learn next?",
];

const responses: Record<string, string> = {
  "Recommend AI talks":
    "Based on your interests, I recommend starting with AI fundamentals, Generative AI, and practical AI engineering talks. Try exploring the AI category next.",
  "Create Frontend Roadmap":
    "Your personalized roadmap is ready! Click the button below to view it.",

  "Summarize this talk":
    "AI Summary: Focus on the main ideas, practical examples, and actionable lessons from the talk. You can use the Talk Details page for the complete transcript and notes.",

  "What should I learn next?":
    "I recommend continuing with React and TypeScript, then moving toward Next.js and real-world projects. Your next goal should be building something you can showcase.",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ type: "ai" | "user"; text: string }[]>([
    {
      type: "ai",
      text: "👋 Hi! I'm your ABTalks AI Learning Assistant. What would you like to learn today?",
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = text.trim();

    setChat((prev) => [...prev, { type: "user", text: userMessage }]);

    const matchedResponse =
      responses[userMessage] ||
      "That's a great learning goal! I recommend exploring related talks in ABTalks and building a small project to apply what you learn.";
    if (userMessage === "Create Frontend Roadmap") {
      setTimeout(() => {
        window.location.href = "/ai-roadmap";
      }, 700);
    }
    setTimeout(() => {
      setChat((prev) => [...prev, { type: "ai", text: matchedResponse }]);
    }, 500);

    setMessage("");
  };

  return (
    <>
      {/* Floating AI Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open AI Learning Assistant"
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
      >
        {open ? <X size={28} /> : <Bot size={28} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden bg-slate-950 border border-slate-700 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="text-white" size={22} />
            </div>

            <div>
              <h2 className="text-white font-bold">AI Learning Assistant</h2>

              <p className="text-blue-100 text-xs">
                Your personal learning mentor
              </p>
            </div>
          </div>

          {/* Chat */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-3">
            {chat.map((item, index) => (
              <div
                key={index}
                className={`flex gap-2 ${
                  item.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {item.type === "ai" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Bot size={14} className="text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                    item.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {item.text}
                </div>

                {item.type === "user" && (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={14} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-4 pb-3 space-y-2">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => sendMessage(item)}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-left text-xs text-slate-300 hover:bg-slate-800 hover:border-blue-500 transition"
              >
                <Sparkles size={14} className="inline mr-2 text-yellow-400" />
                {item}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-3 flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(message);
                }
              }}
              placeholder="Ask your AI mentor..."
              className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => sendMessage(message)}
              className="rounded-xl bg-blue-600 px-3 hover:bg-blue-700 transition"
            >
              <Send className="text-white" size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
