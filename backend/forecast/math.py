import pandas as pd

from .utils import save_logger_levels, suppress_stdout_stderr

with save_logger_levels():
    from fbprophet import Prophet


MODEL_ADDITIVE = 'additive'
MODEL_MULTIPLICATIVE = 'multiplicative'
"""Seasonal component types"""


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
