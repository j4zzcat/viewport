import {context} from "../src/context";
import {WebSocketServer} from "ws";

context.rootLogger.rootLevel = 'debug';
context.createWebSocketServer = (port) => {
    return new WebSocketServer({port: 5055});
}

let usm = context.createUnifiStreamProvider();
let ws = new WebSocket("ws://localhost:5055/192.168.4.10:מדשאה");
