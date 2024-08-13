import sys

sys.path.append("/Users/snd/Development/Projects/j4zzcat/viewport/src/viewport/src")

import asyncio

from aiohttp import web

from backend.cmdsrv import SimpleCommandServer


async def handle(request):
    return web.Response(text="Hello, World!")

async def start_server():
    app = web.Application()
    # app.router.add_get('/', handle)
    # Ensure the static route is configured correctly
    app.router.add_static('/files/', path="/tmp/viewport/transcoding_file_server/files")

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '127.0.0.1', 8004)
    print('Serving on http://127.0.0.1:8004')
    await site.start()

    while True:
        await asyncio.sleep(3600)  # Keep the server running

def run_server():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(start_server())

class Command(SimpleCommandServer.BaseCommand):
    def run(self):
        run_server()



cs = SimpleCommandServer()
cs.run_asynchronously(Command())

# tpe = ThreadPoolExecutor(max_workers=20, thread_name_prefix='TPE')
# tpe.submit(run_server)

# Ensure the main script doesn't exit immediately
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Server is shutting down...")