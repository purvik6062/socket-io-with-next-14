import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV !== "development";

const hostname = "localhost";
const port = 3000;
// const app = next({});
const app = next({ dev });
// const app = next({ prod });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  // const io = new Server(httpServer, {
  //   cors: {
  //     origin: process.env.NEXT_PUBLIC_LOCAL_BASE_URL,
  //     credentials: true,
  //     methods: ["POST", "GET"],
  //   },
  // });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on ${process.env.NEXT_PUBLIC_LOCAL_BASE_URL}`, port);
    });
});
