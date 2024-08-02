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
            from backend.cmdsrv import SimpleCommandServer
            self._logger.debug("Creating {clazz} Singleton".format(clazz=SimpleCommandServer))
            self._command_server = SimpleCommandServer()

        return self._command_server

    def new_streams_cli_command(self, layout, urls, output_dir):
        from cli.streams import StreamsCliCommand
        self._logger.debug("Creating new {clazz} instance".format(clazz=StreamsCliCommand))
        return StreamsCliCommand(layout, urls, output_dir)

    def new_web_server(self, host, port, directory):
        from backend.httpd import SimpleWebServer
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleWebServer))
        return SimpleWebServer(host, port, directory)

    def new_unifi_protocol_controller(self):
        from backend.protocols.unifi import SimpleUnifiProtocolController
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUnifiProtocolController))
        return SimpleUnifiProtocolController()

    def new_unifi_reflector_controller(self):
        from backend.protocols.unifi import SimpleReflectorController
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleReflectorController))
        return SimpleReflectorController()

    def new_unifi_protect_api(self, netloc):
        from backend.protocols.unifi import SimpleUnifiProtectApi
        self._logger.debug("Creating new {clazz} instance".format(clazz=SimpleUnifiProtectApi))
        return SimpleUnifiProtectApi(netloc)


GlobalFactory = GlobalFactory()
