"use client";

import React, { useState, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useSocket();

  console.log("socket", socket);
  useEffect(() => {
    if (socket) {
      socket.on("message", (data: string) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          type="text"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
