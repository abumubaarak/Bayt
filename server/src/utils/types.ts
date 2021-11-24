import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export interface CustomNodeJsGlobal extends NodeJS.Global {
  socketIO: Socket;
}
