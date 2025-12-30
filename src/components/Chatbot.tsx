"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Copy, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou seu assistente de prompts para plataformas no-code. 🚀\n\nDescreva sua ideia ou projeto e eu transformo isso em um prompt detalhado.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://n8n-n8n.serlgy.easypanel.host/webhook/botprompt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userMessage.content,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro no webhook");

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content:
            data.response || "Não consegui gerar resposta agora.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: "⚠️ Erro ao comunicar com o assistente.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) =>
    content.split("\n").map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));

  return (
    /* Wrapper respeita o espaço do layout */
    <div className="w-full h-full px-4">
      {/* Caixa do chatbot */}
      <div
        className="
          flex flex-col
          h-full min-h-0
          max-w-6xl mx-auto
          border border-gray-700/50
          rounded-2xl
          overflow-hidden
          bg-gray-900/70 backdrop-blur
        "
      >
        {/* Espaço visual no topo */}
        <div className="h-4 md:h-6 shrink-0" />

        {/* Mensagens */}
       <div
  className="
    flex-1 min-h-0
    overflow-y-auto
    px-4 md:px-6
    py-6 md:py-8
    space-y-5
    bg-gradient-to-b from-gray-900/30 to-gray-800/20
    scrollbar-thin scrollbar-thumb-gray-600/50 scrollbar-track-transparent
  "
>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  message.isUser
                    ? "bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/30"
                    : "bg-gray-800/50 border border-gray-700/50"
                }`}
              >
                <div className="text-gray-200 whitespace-pre-wrap">
                  {formatMessage(message.content)}
                </div>

                {message.content.includes("```") && (
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(message.content)
                    }
                    className="mt-2 flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    <Copy size={14} />
                    Copiar
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Processando...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="
            shrink-0
            border-t border-gray-700/50
            bg-gray-900/90 backdrop-blur
            px-3 py-3 md:px-6
          "
        >
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              rows={1}
              disabled={isLoading}
              className="
                flex-1 resize-none rounded-xl
                bg-gray-800/60
                border border-gray-700/50
                px-4 py-3
                text-gray-200 placeholder-gray-500
                focus:outline-none focus:ring-1 focus:ring-cyan-400/30
                min-h-[44px] max-h-[120px]
              "
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all ${
                inputValue.trim() && !isLoading
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white active:scale-95"
                  : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
