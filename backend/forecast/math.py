import os

from fbprophet import Prophet
import pandas as pd


MODEL_ADDITIVE = 'additive'
MODEL_MULTIPLICATIVE = 'multiplicative'
"""Seasonal component types"""


class suppress_stdout_stderr(object):
    """
    A context manager for doing a "deep suppression" of stdout and stderr in Python, i.e. will
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


def calculate_forecast(data, model=MODEL_ADDITIVE, date_start='2018-01-01', period_type='W',
                       period_count=5, changepoint_scale=0.05, changepoint_dates=None):
    """
    Calculate time series forecast

    Args:
        data (list[float]): Input time series values
        model (str): Seasonal component type
        date_start (str): Time series first date
        period_type (str): Time series period type
        period_count (int): Forecasting period count
        changepoint_scale (float): Parameter modulating the flexibility of automatic
                                   changepoint selection
        changepoint_dates (list[str]): List of dates at which to include potential changepoints

    Returns:
        dict: Calculation results (forecast and confidence interval)
    """
    # Prepare data
    df = pd.DataFrame({
        'ds': pd.date_range(date_start, periods=len(data), freq=period_type),
        'y': data,
    })
    # Use model
    with suppress_stdout_stderr():
        m = Prophet(
            seasonality_mode=model, changepoint_prior_scale=changepoint_scale,
            changepoints=changepoint_dates,
        ).fit(df)
        future = m.make_future_dataframe(periods=period_count, freq=period_type)
        forecast = m.predict(future)
    # Prepare result data
    if isinstance(m.changepoints, pd.DatetimeIndex):
        changepoints = m.changepoints.to_series()
    else:
        changepoints = m.changepoints
    return {
        'forecast': forecast['yhat'],
        'lower': forecast['yhat_lower'],
        'upper': forecast['yhat_upper'],
        'changepoints': changepoints.dt.date,
    }
