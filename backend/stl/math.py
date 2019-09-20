from math import exp, log

from stldecompose import decompose


MODEL_ADDITIVE = 'additive'
MODEL_MULTIPLICATIVE = 'multiplicative'
"""Seasonal component types"""


def calculate_decomposition(data, model=MODEL_ADDITIVE, frequency=2):
    """
    Calculate time series decomposition

    Args:
        data (list[float]): Input time series values
        model (str): Seasonal component type
        frequency (int): Seasonal component frequency

    Returns:
        dict: Calculation results (trend, seasonal, residual components)
    """
    # Prepare data
    if model == MODEL_MULTIPLICATIVE:
        data = [log(x) for x in data]
    # Use model
    decomp = decompose(data, period=frequency)
    # Prepare result data
    if model == MODEL_MULTIPLICATIVE:
        decomp.trend = [exp(x) for x in decomp.trend]
        decomp.seasonal = [exp(x) for x in decomp.seasonal]
        decomp.resid = [exp(x) for x in decomp.resid]
    return {
        'trend': decomp.trend,
        'seasonal': decomp.seasonal,
        'resid': decomp.resid,
    }
