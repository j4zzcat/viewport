import inspect
import time

from context import GlobalFactory

utils_logger = GlobalFactory.get_logger().get_child("Utils")

future_busy_wait_logger = utils_logger.getChild("future_busy_wait")
def future_busy_wait(future, timeout_ms):
    sleep_ms = 200
    waiting_ms = 0
    while not future.done():
        time.sleep(sleep_ms / 1000)
        waiting_ms += sleep_ms
        if waiting_ms > timeout_ms:
            future_busy_wait_logger.debug("Timeout, future '{future}' did not complete in time '{timeout}' (ms)".format(
                future=future,
                timeout=timeout_ms))
            raise TimeoutError

    return future.result()


condition_busy_wait_logger = utils_logger.getChild("condition_busy_wait")
def condition_busy_wait(condition_fn, timeout_ms):
    sleep_ms = 200
    waiting_ms = 0
    while not condition_fn():
        time.sleep(sleep_ms / 1000)
        waiting_ms += sleep_ms
        if waiting_ms > timeout_ms:
            try:
                condition_fn_repr = inspect.getsource(condition_fn).strip()
            except OSError:
                condition_fn_repr = repr(condition_fn)

            condition_busy_wait_logger.debug("Timeout, condition '{condition}' was not met on time '{timeout}' (ms)".format(
                condition=condition_fn_repr,
                timeout=timeout_ms))
            raise TimeoutError

