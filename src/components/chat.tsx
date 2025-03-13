import { useEffect, useState } from "react";
import socket from "../socket";

type Props = {
  room: string;
  username: string;
};

export default function Chat({ room, username }: Props) {
  const [messages, setMessages] = useState<
    { username: string; message: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", { room, username, message: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="pb-5">Room: {room}</h3>
      <div className="min-h-[70svh] space-y-2">
        {messages.map((msg, index) => (
          <div
            className={
              msg.username === username
                ? "flex justify-end"
                : "flex justify-start"
            }
          >
            <div
              key={index}
              className={`p-4 bg-gray-700 w-fit rounded ${msg.username === username ? "bg-teal-900 items-end" : ""}`}
            >
              <strong>{msg.username}:</strong> {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="input w-full "
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-success" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
