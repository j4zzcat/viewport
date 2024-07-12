import {ProtectApi, ProtectLivestream} from "unifi-protect";
import {WebSocketServer} from "ws";

const express = require('express');
const app = express();
let wss: WebSocketServer;
let streams = new Map<string, ProtectLivestream>()

const port = process.env.PORT || 3000; // Use the port provided by the host or default to 3000
app.listen(port, () => {
    console.log(`RESTServer listening on port ${port}`);
    wss = new WebSocketServer({port: 4001});
    wss.once("listening", () => {
        console.log(`WebSocketServer listening on port ${wss.address().port}`);
    });

    wss.on("connection", (ws, request) => {
        console.log(`Client '${request.remoteAddress}:${request.remotePort}' asks for stream '${request.url}'`);

        let livestream = streams.get(request.url);
        if(livestream == undefined) {
            ws.send(JSON.stringify({error: `Stream '${request.url}' not found`}));
        } else {
            livestream.on("message", (buffer) => {
                ws.send(buffer);
            });
        }
    });
});

app.post("/api/livestream/:nvr/:cameraId", (req, res) => {
    let nvrUrl = new URL(`unifi://${req.params.nvr}`);
    let cameraId = req.params.cameraId;
    let protectApi = new ProtectApi();

    let key = `${nvrUrl.host}/${cameraId}`;
    let streamEndpoint = `ws://${wss.address().address}:${wss.address().port}/${key}`;

    protectApi.login(nvrUrl.host, nvrUrl.username, nvrUrl.password).then( ()=> {
        protectApi.getBootstrap().then(() => {
            console.log(protectApi.bootstrap.cameras);
            let livestream = protectApi.createLivestream();
            livestream.once("codec", (codec) => {
                streams.set(key, livestream);
                res.send(JSON.stringify({streamEndpoint: streamEndpoint, streamCodec: codec}));
            });

            livestream.start(cameraId, 0);
        })
    })
});

app.delete("/api/livestream/:nvr/:cameraId", (req, res) => {
    let key = `${req.params.nvr}/${req.params.cameraId}`;
    let livestream = streams.get(key);
    if(livestream != undefined) {
        livestream.stop();
        streams.delete(key);
        res.send(JSON.stringify({returnCode: "ok", message: `${key} deleted`}));
    } else {
        res.send(JSON.stringify({returnCode: "error", message: `${key} not found`}));
    }
});
