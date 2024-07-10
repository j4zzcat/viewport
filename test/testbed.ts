import {WebSocket} from "ws";
import {nextFreePort} from "../src/utils/net";

async function test() {
    let port = await nextFreePort(8087);
    console.log(port);
    let webSocketServer1 = await new WebSocket.Server({port: port});
    await new WebSocket.Server({port: 8087});
    // port = await nextFreePort(8087);
    // console.log(port);
    // let webSocketServer2 = await new WebSocket.Server({port: port});
    //
    // port = await nextFreePort(8087);
    // console.log(port);
    // let webSocketServer3 = await new WebSocket.Server({port: port});
    //
    // port = await nextFreePort(8087);
    // console.log(port);
    // let webSocketServer4 = await new WebSocket.Server({port: port});
}

test();