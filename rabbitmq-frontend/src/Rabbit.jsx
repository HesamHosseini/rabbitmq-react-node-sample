import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function Rabbit() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const rendered = useRef(false);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/notifications");
    const data = await response.json();
    setMessages(data);
    console.log(data);
  };

  useEffect(() => {
    if (!rendered.current) {
      if (!socket) {
        setSocket(io("http://localhost:3000"));
        rendered.current = true;
      }
      console.log("i'm inside useEffect");

      console.log("it is the first render ");

      // if socket state is filled up
    }
    if (socket) {
      // Listen for messages from the WebSocket server
      socket.on("message", (message) => {
        fetchData();
      });

      // Clean up the socket connection when the component unmounts
    }

    return () => {
      console.log("khodafez");
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>RabbitMQ + WebSocket + React (Vite)</h1>
      <p>Messages received from RabbitMQ:</p>
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {/* {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {msg}
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Rabbit;
