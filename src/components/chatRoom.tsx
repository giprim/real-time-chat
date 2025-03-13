import { useState } from "react";
import socket from "../socket";
import ActiveRooms from "./activeRooms";

type Props = {
  onJoin: (room: string) => void;
};

export default function ChatRooms({ onJoin }: Props) {
  const [room, setRoom] = useState("");

  const handleJoin = () => {
    if (room.trim()) {
      socket.emit("joinRoom", {
        room,
        username: localStorage.getItem("username"),
      });
      onJoin(room);
    }
  };

  return (
    <div className="min-h-[99svh] flex justify-center items-center ">
      <div className="w-full space-y-2 max-w-lg">
        <h3>Join Chat Room</h3>
        <ActiveRooms onJoin={onJoin} />
        <div className="space-x-2 w-full flex pt-4 ">
          <input
            type="text"
            placeholder="Enter chat room"
            className="input input-md w-full"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleJoin}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
