import time


def busy_wait(future, timeout_ms, exception):
    sleep_ms = 100
    waiting_ms = 0
    while not future.done():
        time.sleep(sleep_ms / 1000)
        waiting_ms += sleep_ms
        if waiting_ms > timeout_ms:
            raise exception

    return future.result()
