import { Server } from "ws";

const SocketHandler = (req, res) => {
  if (res.socket.server.ws) {
    console.log("WebSocket server already running");
    res.end();
    return;
  }

  console.log("Initializing WebSocket server...");
  const wss = new Server({ server: res.socket.server });
  res.socket.server.ws = wss;

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      console.log("Received:", data);

      // Forward message logic
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  res.end();
};

export default SocketHandler;
