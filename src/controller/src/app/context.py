

class Context:
    def __init__(self):
        self._logger = None
        self._executer = None

    def get_logger(self):
        if not self._logger:
            from src.app.logger import SimpleLogger
            self._logger = eval("SimpleLogger()")

        return self._logger

    def get_executer(self):
        if not self._executer:
            from src.app.executer import SimpleExecuter
            self._executer = eval("SimpleExecuter()")

        return self._executer

    # def createStreamsCommand(self, layout, urls):
    #     return StreamsCommand(layout, urls)
    #
    # def createReflectorController(self):
    #     return ReflectorController()
    #

Context = Context()
