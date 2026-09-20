"use client";

import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { MessageCircle, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminMessagesPage() {
  const { messages, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(inputText.trim(), 'admin');
      setInputText("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-bold font-plus-jakarta tracking-tight">Customer Support</h1>
        <p className="text-muted-foreground mt-1">Live chat and messages from your customers.</p>
      </div>

      <div className="flex-1 bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar (Mocked Customer List) */}
        <div className="w-full md:w-80 border-r flex flex-col shrink-0">
          <div className="p-4 border-b bg-muted/30">
            <h3 className="font-bold font-plus-jakarta">Active Conversations</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Single mocked active customer representing the global store */}
            <button className="w-full text-left p-4 border-b hover:bg-muted/50 transition-colors bg-muted/20 border-l-4 border-l-primary">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">Guest Customer</span>
                <span className="text-xs text-muted-foreground">Now</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {messages[messages.length - 1]?.text || "No messages yet"}
              </p>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background/50">
          {/* Header */}
          <div className="h-16 border-b flex items-center px-6 shrink-0 bg-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-bold font-plus-jakarta">Guest Customer</h3>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => {
              const isAdmin = msg.sender === 'admin';
              return (
                <div key={msg.id} className={cn("flex flex-col max-w-[70%]", isAdmin ? "items-end self-end ml-auto" : "items-start")}>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm shadow-sm",
                    isAdmin 
                      ? "bg-primary text-primary-foreground rounded-br-sm" 
                      : "bg-card border rounded-bl-sm"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-card border-t shrink-0 flex gap-4 items-center">
            <input 
              type="text"
              placeholder="Type your reply to Guest Customer..."
              className="flex-1 h-12 px-4 rounded-full border bg-muted/50 focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button type="submit" size="icon" className="h-12 w-12 rounded-full shrink-0" disabled={!inputText.trim()}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>

      </div>

    </div>
  );
}
