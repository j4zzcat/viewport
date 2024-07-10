import {AddressInfo, Server} from "net";

export async function nextFreePort(startPort:number): Promise<number> {
    let port = startPort;

    const server = new Server();
    server.on("listen", () => {
        server.close();
        return port;
    });

    while(true) {
        try {
            await server.listen(port);
        } catch(e) {
            port++;
            if(port >= 65535) {
                server.close();
                throw new Error("Can't find free port");
            }
        }

        return port;
    }
}

//
// export function nextFreePort(start: number): Promise<number> {
//     return new Promise((resolve, reject) => {
//
//         const server = new Server();
//         server.on("error", () => {
//             server.listen(++start, () => {
//                     const port = (server.address() as AddressInfo).port;
//                     server.close(() => resolve(port));
//                 }
//             );
//         });
//
//         server.listen(start, () => {
//                 const port = (server.address() as AddressInfo).port;
//                 server.close(() => resolve(port));
//             }
//         );
//     });
// }

// import {AddressInfo, createServer, Server} from "net";
//
// export function nextFreePort(start: number): Promise<number> {
//     return new Promise((resolve, reject) => {
//         const tryPort = (port: number) => {
//             const server = createServer();
//
//             server.once('error', (err: NodeJS.ErrnoException) => {
//                 server.close();
//                 if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
//                     // Port is already in use or access denied, try the next port
//                     tryPort(port + 1);
//                 } else {
//                     // Some other error, reject the promise
//                     reject(err);
//                 }
//             });
//
//             server.once('listening', () => {
//                 const actualPort = (server.address() as AddressInfo).port;
//                 server.close(() => resolve(actualPort));
//             });
//
//             server.listen(port);
//         };
//
//         tryPort(start);
//     });
// }