"use client";

import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { MessageCircle, X, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function LiveChatWidget() {
  const { messages, isOpen, toggleChat, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText.trim(), 'customer');
      setInputText("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 md:bottom-8 md:right-8 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-card w-[calc(100vw-32px)] md:w-[360px] h-[calc(100vh-120px)] max-h-[480px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-200">
          
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold font-plus-jakarta text-sm">ENDEW Master Tailor</h4>
                <p className="text-xs opacity-80 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className="p-1 hover:bg-white/10 rounded-md transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((msg) => {
              const isCustomer = msg.sender === 'customer';
              return (
                <div key={msg.id} className={cn("flex flex-col max-w-[85%]", isCustomer ? "items-end self-end ml-auto" : "items-start")}>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm",
                    isCustomer 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-card border shadow-sm rounded-bl-sm text-foreground"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t bg-card shrink-0 flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-3 bg-muted rounded-full text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow"
            />
            <Button type="submit" size="icon" className="rounded-full w-10 h-10 shrink-0" disabled={!inputText.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>

        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={toggleChat}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform hover:shadow-xl active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

    </div>
  );
}
