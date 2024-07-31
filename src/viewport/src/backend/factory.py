from backend.logger import SimpleLogger


class GlobalFactory:
    def __init__(self):
        self._root_logger = SimpleLogger()
        self._root_logger.set_level("INFO")
        self._logger = self._root_logger.get_child("GlobalFactory")
        self._executer = None
        self._command_server = None

    def get_logger(self):
        return self._root_logger

    def get_executer(self):
        if not self._executer:
            self._logger.debug("Creating Executer Singleton")
            from backend.cmdsrv import SimpleExecuter
            self._executer = SimpleExecuter()

        return self._executer

    def get_command_server(self):
        if not self._command_server:
            self._logger.debug("Creating CommandServer Singleton")
            from backend.cmdsrv import SimpleCommandServer
            self._command_server = SimpleCommandServer()

        return self._command_server

    def new_web_server(self, host, port, directory):
        self._logger.debug("Creating new SimpleWebServer instance")
        from backend.httpd import SimpleWebServer
        return SimpleWebServer(host, port, directory)

    def new_streams_command(self, layout, urls, output_dir):
        self._logger.debug("Creating new StreamsCommand instance")
        from commands.streams import StreamsCommand
        return StreamsCommand(layout, urls, output_dir)

    def new_reflector_controller(self):
        self._logger.debug("Creating new SimpleReflectorController instance")
        from backend.reflector import SimpleReflectorController
        return SimpleReflectorController()

    def new_unifi_protect_api(self, netloc):
        self._logger.debug("Creating new UnifiProtectApi instance")
        from backend.unifi import SimpleUnifiProtectApi
        return SimpleUnifiProtectApi(netloc)


GlobalFactory = GlobalFactory()
