#
# This file is part of Viewport.
# By Sharon Dagan <https://github.com/j4zzcat>, Copyright (C) 2024.
#
# Viewport is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free
# Software Foundation, either version 3 of the License, or (at your option)
# any later version.
#
# This software is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
# more details.
#
# You should have received a copy of the GNU General Public License along with
# This software. If not, see <https://www.gnu.org/licenses/>.
#

import inspect
import threading
import time
from collections.abc import MutableMapping

from context import GlobalFactory

utils_logger = GlobalFactory.get_logger().getChild("Utils")


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


class RWLock:
    def __init__(self):
        self._read_ready = threading.Condition(threading.Lock())
        self._readers = 0

    def acquire_read(self):
        with self._read_ready:
            self._readers += 1

    def release_read(self):
        with self._read_ready:
            self._readers -= 1
            if self._readers == 0:
                self._read_ready.notify_all()

    def acquire_write(self):
        self._read_ready.acquire()
        while self._readers > 0:
            self._read_ready.wait()

    def release_write(self):
        self._read_ready.release()


class RWLockDict(MutableMapping):
    def __init__(self, *args, **kwargs):
        self._dict = dict(*args, **kwargs)
        self._rwlock = RWLock()

    def __getitem__(self, key):
        self._rwlock.acquire_read()
        try:
            return self._dict[key]
        finally:
            self._rwlock.release_read()

    def __setitem__(self, key, value):
        self._rwlock.acquire_write()
        try:
            self._dict[key] = value
        finally:
            self._rwlock.release_write()

    def __delitem__(self, key):
        self._rwlock.acquire_write()
        try:
            del self._dict[key]
        finally:
            self._rwlock.release_write()

    def __iter__(self):
        self._rwlock.acquire_read()
        try:
            return iter(self._dict.copy())
        finally:
            self._rwlock.release_read()

    def __len__(self):
        self._rwlock.acquire_read()
        try:
            return len(self._dict)
        finally:
            self._rwlock.release_read()

    def __contains__(self, key):
        self._rwlock.acquire_read()
        try:
            return key in self._dict
        finally:
            self._rwlock.release_read()

    def __repr__(self):
        self._rwlock.acquire_read()
        try:
            return repr(self._dict)
        finally:
            self._rwlock.release_read()

    def get(self, key, default=None):
        self._rwlock.acquire_read()
        try:
            return self._dict.get(key, default)
        finally:
            self._rwlock.release_read()

    def setdefault(self, key, default=None):
        self._rwlock.acquire_write()
        try:
            return self._dict.setdefault(key, default)
        finally:
            self._rwlock.release_write()

    def pop(self, key, default=None):
        self._rwlock.acquire_write()
        try:
            return self._dict.pop(key, default)
        finally:
            self._rwlock.release_write()

    def popitem(self):
        self._rwlock.acquire_write()
        try:
            return self._dict.popitem()
        finally:
            self._rwlock.release_write()

    def clear(self):
        self._rwlock.acquire_write()
        try:
            self._dict.clear()
        finally:
            self._rwlock.release_write()

    def update(self, other=(), /, **kwds):
        self._rwlock.acquire_write()
        try:
            self._dict.update(other, **kwds)
        finally:
            self._rwlock.release_write()

    def keys(self):
        self._rwlock.acquire_read()
        try:
            return self._dict.keys()
        finally:
            self._rwlock.release_read()

    def items(self):
        self._rwlock.acquire_read()
        try:
            return self._dict.items()
        finally:
            self._rwlock.release_read()

    def values(self):
        self._rwlock.acquire_read()
        try:
            return self._dict.values()
        finally:
            self._rwlock.release_read()