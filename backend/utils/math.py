from collections.abc import Iterable


def round_values(data, places=3):
    """
    Round values in nested structures

    Args:
        data: Value / structure with values
        places (int): Decimal places

    Returns:
        Rounded value / Structure with rounded values
    """
    if isinstance(data, dict):
        return {k: round_values(v, places) for k, v in data.items()}
    if isinstance(data, Iterable):
        return [round_values(x, places) for x in data]
    return round(data, places)
