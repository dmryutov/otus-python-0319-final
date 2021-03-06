import logging
import os


class save_logger_levels(object):
    """
    Context manager that backups and then restores all loggers levels
    """
    def __enter__(self):
        self.root_level = logging.getLogger().level
        self.levels = {
            name: logging.getLogger(name).level
            for name in logging.root.manager.loggerDict
        }

    def __exit__(self, *_):
        logging.getLogger().setLevel(self.root_level)
        for name, level in self.levels.items():
            logging.getLogger(name).setLevel(level)


class suppress_stdout_stderr(object):
    """
    Context manager for doing a "deep suppression" of stdout and stderr in Python, i.e. will
    suppress all print, even if the print originates in a compiled C/Fortran sub-function.
    This will not suppress raised exceptions, since exceptions are printed to stderr just before
    a script exits, and after the context manager has exited (at least, I think that is why
    it lets exceptions through).

    References:
        https://github.com/facebook/prophet/issues/223
    """
    def __init__(self):
        # Open a pair of null files
        self.null_fds = [os.open(os.devnull, os.O_RDWR) for _ in range(2)]
        # Save the actual stdout (1) and stderr (2) file descriptors
        self.save_fds = (os.dup(1), os.dup(2))

    def __enter__(self):
        # Assign the null pointers to stdout and stderr
        os.dup2(self.null_fds[0], 1)
        os.dup2(self.null_fds[1], 2)

    def __exit__(self, *_):
        # Re-assign the real stdout/stderr back to (1) and (2)
        os.dup2(self.save_fds[0], 1)
        os.dup2(self.save_fds[1], 2)
        # Close the null files
        os.close(self.null_fds[0])
        os.close(self.null_fds[1])
