class Context:
    def __init__(self):
        self._root_logger = None
        self._logger = None
        self._executer = None

    def get_logger(self):
        if not self._root_logger:
            from app.logger import SimpleLogger
            self._root_logger = SimpleLogger()

            self._logger = self._root_logger.get_child("Context")
            self._root_logger.set_level("INFO")
            self._logger.info("Hello")
            self._logger.info("Created Logger Singleton")

        return self._root_logger

    def get_executer(self):
        if not self._executer:
            self._logger.debug("Creating Executer Singleton")
            from app.executer import SimpleExecuter
            self._executer = SimpleExecuter()

        return self._executer

    def create_streams_command(self, layout, urls):
        self._logger.debug("Creating StreamsCommand instance")
        from app.command.streams import StreamsCommand
        return StreamsCommand(layout, urls)

    def create_reflector_controller(self):
        self._logger.debug("Creating SimpleReflectorController instance")
        from app.reflector.controller import SimpleReflectorController
        return SimpleReflectorController()

    def create_unifi_api(self, netloc):
        self._logger.debug("Creating UnifiApi instance")
        from app.unifi.api import SimpleUnifiApi
        return SimpleUnifiApi(netloc)


Context = Context()
