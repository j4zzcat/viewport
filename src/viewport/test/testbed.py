import asyncio
from aiohttp import web
import concurrent.futures


class Command:
    def run(self) -> any:
        if hasattr(self, "_logger"):
            self._logger.debug("Running")

    def done(self):
        if hasattr(self, "_logger"):
            self._logger.debug("Done")


class AsyncCommand:
    async def run(self, loop) -> any:
        if hasattr(self, "_logger"):
            self._logger.debug("Running")

    async def done(self):
        if hasattr(self, "_logger"):
            self._logger.debug("Done")


class AiohttpServerCommand(AsyncCommand):
    def __init__(self, host='localhost', port=5050, route='/static', directory='/tmp/viewport'):
        self.host = host
        self.port = port
        self.route = route
        self.directory = directory

    async def run(self, loop):
        await self._run_forever()

    async def _run_forever(self):
        app = web.Application()
        app.router.add_get('/', self._handle)
        app.router.add_static(self.route, path=self.directory, show_index=True)

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, self.host, self.port)
        await site.start()
        print(f"Server started at http://{self.host}:{self.port} serving {self.directory}")

        # Run the event loop forever
        try:
            await asyncio.Event().wait()
        except asyncio.CancelledError:
            print("Server is shutting down...")

    async def _handle(self, request):
        return web.Response(text="Hello, Aiohttp!")




class CommandServer:
    def __init__(self):
        self._tpe = concurrent.futures.ThreadPoolExecutor(max_workers=5, thread_name_prefix='TPE')

    def submit(self, command, runner="thread") -> concurrent.futures.Future:
        if runner == "thread":
            return self._tpe.submit(self._run_command, command)

    def _run_command(self, command) -> any:
        if isinstance(command, AsyncCommand):
            # Create an asyncio event loop for the command
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                result = loop.run_until_complete(command.run(loop))
            finally:
                command.done()
                loop.close()
            return result
        elif isinstance(command, Command):
            return command.run()

    def shutdown(self):
        self._tpe.shutdown(wait=True)

def main():
    server = CommandServer()

    try:
        # Start the aiohttp server command
        future = server.submit(AiohttpServerCommand(
            host='localhost',
            port=5050,
            route='/static',
            directory='/tmp/viewport'
        ))

        # Wait for the server to be properly initialized (optional)
        future.result()

    finally:
        server.shutdown()

if __name__ == "__main__":
    main()
