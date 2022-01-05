import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Conversation } from "./conversationModel";

export const instant = (app: Application) => {
  const httpServer = createServer(app);
  const io: Server = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  io.on("connection", (socket) => {
    socket.on("user", (data) => {
      socket.join(data);
    });
    socket.on("send_message", async (data, callback) => {
      console.log(data);
      const { tenant_id, owner_id, sender, message, messageId } = data;
      const reciever = sender === owner_id ? tenant_id : owner_id;
      callback({ sent: "ok" });
      await Conversation.create(
        {
          tenant_id,
          owner_id,
          message,
          messageId,
          sender,
        },
        (err: any, doc: any) => {
            if (doc) {
            socket
              .to(reciever + messageId)
              .to(sender + messageId)
              .emit("receive_chat", data);
          }
        }
      );
    });
    socket.on("typing", (data) => {
      const { tenant_id, owner_id, sender, messageId, isTyping } = data;
      const reciever = sender === owner_id ? tenant_id : owner_id;
      socket.to(reciever + messageId).emit("typing", { isTyping: true });
    });
  });
  httpServer.listen(9000, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:9000/`);
  });
};
