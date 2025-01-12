import React from "react";
import Rabbit from "./Rabbit";

export default function App() {
  const [clicked, setClicked] = React.useState(true);
  return (
    <div>
      <h1>RabbitMQ + WebSocket + React (Vite)</h1>
      <p>Messages received from RabbitMQ:</p>
      <button
        onClick={() => {
          setClicked((prev) => !clicked);
        }}
      >
        click to toggle rabbit component
      </button>
      {clicked && <Rabbit />}
    </div>
  );
}
