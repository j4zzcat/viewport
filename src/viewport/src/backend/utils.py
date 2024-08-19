import inspect
import logging
import time

from context import GlobalFactory

utils_logger = GlobalFactory.get_logger().get_child("Utils")


# The split_kwargs function separates specified keywords from the original dictionary
# of keyword arguments and assigns them default values if not present. It returns the
# modified kwargs dictionary and a new dictionary with the separated keywords and their
# corresponding values.
def split_kwargs(kwargs, extra_kwargs):
    extra_kwargs_found = {}
    for kw, default_value in extra_kwargs:
        if kw in kwargs:
            value = kwargs[kw]
            del kwargs[kw]
        else:
            value = default_value

        extra_kwargs_found[kw] = value

    return kwargs, extra_kwargs_found


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

