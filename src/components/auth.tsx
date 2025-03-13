import { useState } from "react";

const Auth = ({ onAuth }: { onAuth: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onAuth(username);
    }
  };

  return (
    <div className="min-h-[99svh] flex justify-center items-center ">
      <div className="w-full space-y-2 max-w-lg">
        <h3>Join Chat</h3>
        <div className="space-x-2 w-full flex ">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            className="input input-md w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleLogin}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
