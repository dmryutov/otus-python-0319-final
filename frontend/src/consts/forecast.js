/**
 * Possible forecast periods
 */
export const FORECAST_PERIOD_DAY = 'D';
export const FORECAST_PERIOD_WEEK = 'W';
export const FORECAST_PERIOD_MONTH = 'MS';
export const FORECAST_PERIOD_QUARTER = 'QS';
export const FORECAST_PERIOD_HALF = '6MS';
export const FORECAST_PERIOD_YEAR = 'AS';
export const FORECAST_PERIODS = [
    {
        value: FORECAST_PERIOD_DAY,
        text: 'Day',
    },
    {
        value: FORECAST_PERIOD_WEEK,
        text: 'Week',
    },
    {
        value: FORECAST_PERIOD_MONTH,
        text: 'Month',
    },
    {
        value: FORECAST_PERIOD_QUARTER,
        text: 'Quarter',
    },
    {
        value: FORECAST_PERIOD_HALF,
        text: 'Year Half',
    },
    {
        value: FORECAST_PERIOD_YEAR,
        text: 'Year',
    },
];
export const FORECAST_MOMENT_PERIODS = {
    [FORECAST_PERIOD_DAY]: 'days',
    [FORECAST_PERIOD_WEEK]: 'weeks',
    [FORECAST_PERIOD_MONTH]: 'months',
    [FORECAST_PERIOD_QUARTER]: 'months',
    [FORECAST_PERIOD_HALF]: 'months',
    [FORECAST_PERIOD_YEAR]: 'years',
};
export const FORECAST_MOMENT_MULTIPLIER = {
    [FORECAST_PERIOD_DAY]: 1,
    [FORECAST_PERIOD_WEEK]: 1,
    [FORECAST_PERIOD_MONTH]: 1,
    [FORECAST_PERIOD_QUARTER]: 3,
    [FORECAST_PERIOD_HALF]: 6,
    [FORECAST_PERIOD_YEAR]: 1,
};


/**
 * Possible trend changepoint detection methods
 */
export const FORECAST_CHANGEPOINT_METHOD_AUTO = 'auto';
export const FORECAST_CHANGEPOINT_METHOD_SCALE = 'scale';
export const FORECAST_CHANGEPOINT_METHOD_DATES = 'dates';
export const FORECAST_CHANGEPOINT_METHODS = [
    {
        value: FORECAST_CHANGEPOINT_METHOD_AUTO,
        text: 'Automatic',
    },
    {
        value: FORECAST_CHANGEPOINT_METHOD_SCALE,
        text: 'Scale',
    },
    {
        value: FORECAST_CHANGEPOINT_METHOD_DATES,
        text: 'Dates',
    },
];
