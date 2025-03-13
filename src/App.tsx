import { useState } from "react";
import Auth from "./components/auth";
import Chat from "./components/chat";
import ChatRooms from "./components/chatRoom";

const App = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || "",
  );
  const [room, setRoom] = useState("");

  return (
    <div className="container mx-auto max-w-3xl p-4 ">
      {!username ? (
        <Auth
          onAuth={(name) => {
            localStorage.setItem("username", name);
            setUsername(name);
          }}
        />
      ) : !room ? (
        <ChatRooms onJoin={setRoom} />
      ) : (
        <Chat room={room} username={username} />
      )}
    </div>
  );
};

export default App;
