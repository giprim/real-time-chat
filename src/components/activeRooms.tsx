import { useEffect, useState } from "react";
import socket from "../socket";
type Props = {
  onJoin: (room: string) => void;
};

const ActiveRooms = ({ onJoin }: Props) => {
  const [rooms, setRooms] = useState([]);

  const handleJoin = (room: string) => {
    socket.emit("joinRoom", {
      room,
      username: localStorage.getItem("username"),
    });
    onJoin(room);
  };

  useEffect(() => {
    socket.on("activeRooms", (rooms) => setRooms(rooms));
    socket.emit("requestActiveRooms");
    return () => {
      socket.off("activeRooms");
    };
  }, []);

  return (
    <div className="flex flex-col p-3 bg-gray-700 rounded-md ">
      <h2 className="text-sm text-success font-bold mb-2">Active Rooms</h2>
      <div className="flex gap-2 flex-wrap">
        {rooms.map((room) => (
          <button
            onClick={() => handleJoin(room)}
            key={room}
            className="btn btn-soft"
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveRooms;
