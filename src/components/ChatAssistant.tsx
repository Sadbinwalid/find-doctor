"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, AlertCircle } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseLinks(text: string) {
  const parts = text.split(/(\[(?:disease|specialty):[a-z-]+\])/g);
  return parts.map((part, i) => {
    const diseaseMatch = part.match(/^\[disease:([a-z-]+)\]$/);
    const specialtyMatch = part.match(/^\[specialty:([a-z-]+)\]$/);
    if (diseaseMatch) {
      const slug = diseaseMatch[1];
      const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return (
        <Link key={i} href={`/disease/${slug}`} className="inline-block px-2 py-0.5 mx-0.5 bg-emerald-50 border border-emerald-200 text-[#059669] rounded-full text-xs font-medium hover:bg-emerald-100 transition-colors">
          {label}
        </Link>
      );
    }
    if (specialtyMatch) {
      const slug = specialtyMatch[1];
      const label = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return (
        <Link key={i} href={`/category/${slug}`} className="inline-block px-2 py-0.5 mx-0.5 bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors">
          {label}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const SUGGESTIONS = [
  "I have chest pain",
  "আমার মাথা ঘুরছে",
  "My child has fever",
  "পেটে ব্যথা হচ্ছে",
  "I feel dizzy and thirsty",
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hello! I'm the DoctorBD Assistant. Tell me your symptoms or ask about a disease — in Bengali or English — and I'll guide you to the right specialist. [specialty:general-physician]",
        },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text?: string) => {
    const query = (text ?? input).trim();
    if (!query || streaming) return;
    setInput("");

    const userMsg: Message = { role: "user", content: query };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't connect right now. Please try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-50 w-13 h-13 bg-[#059669] text-white rounded-full shadow-lg hover:bg-[#047857] transition-all flex items-center justify-center gap-2 px-4 ${open ? "hidden" : "flex"}`}
        aria-label="Open chat assistant"
      >
        <MessageCircle size={20} />
        <span className="text-sm font-medium hidden sm:inline">Ask AI</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden" style={{ height: "520px" }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#059669] text-white flex-shrink-0">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm leading-tight">DoctorBD Assistant</p>
              <p className="text-xs text-emerald-100">Ask in Bengali or English</p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-[#059669] text-white" : "bg-gray-100 text-gray-600"}`}>
                  {msg.role === "user" ? <User size={13} /> : <Bot size={13} />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${msg.role === "user" ? "bg-[#059669] text-white rounded-tr-sm" : "bg-gray-100 text-gray-800 rounded-tl-sm"}`}>
                  {msg.role === "assistant" ? parseLinks(msg.content) : msg.content}
                  {streaming && i === messages.length - 1 && msg.role === "assistant" && msg.content === "" && (
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only on first turn) */}
          {messages.length === 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-2.5 py-1 border border-gray-200 rounded-full text-gray-600 hover:border-[#059669] hover:text-[#059669] transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border-t border-amber-100 flex-shrink-0">
            <AlertCircle size={11} className="text-amber-500 flex-shrink-0" />
            <p className="text-[10px] text-amber-700">AI guidance only — not a substitute for professional medical advice.</p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type symptoms…"
              disabled={streaming}
              className="flex-1 text-sm outline-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 placeholder-gray-400 text-gray-900 disabled:opacity-60"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || streaming}
              className="w-9 h-9 bg-[#059669] text-white rounded-xl flex items-center justify-center hover:bg-[#047857] transition-colors disabled:opacity-40 flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
