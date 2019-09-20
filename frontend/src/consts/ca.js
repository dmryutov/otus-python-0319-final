import {CHART_COL_COLOR, CHART_ROW_COLOR} from '@/consts/color';


/**
 * Possible factor statuses
 */
export const CA_STATUS_OFF = 'Off';
export const CA_STATUS_SUP = 'Supplementary';
export const CA_STATUSES = [null, CA_STATUS_OFF, CA_STATUS_SUP];

/**
 * Possible factor statuses
 */
export const CA_LABEL_POSITIONS = {
    top: {},
    right: {align: 'left', x: 2, y: 11},
    bottom: {y: 22},
    left: {align: 'right', x: -3, y: 11},
};


/**
 * Possible factor scaling modes
 */
export const CA_SCALING_SYMMETRIC = 'symmetric';
export const CA_SCALING_ROWPRINCIPAL = 'rowprincipal';
export const CA_SCALING_COLPRINCIPAL = 'colprincipal';
export const CA_SCALING = [
    {
        value: CA_SCALING_SYMMETRIC,
        text: 'Symmetric',
    },
    {
        value: CA_SCALING_ROWPRINCIPAL,
        text: 'Row Principal',
        color: CHART_ROW_COLOR,
    },
    {
        value: CA_SCALING_COLPRINCIPAL,
        text: 'Col Principal',
        color: CHART_COL_COLOR,
    },
];


/**
 * Possible factor dimensions for angles
 */
export const CA_ANGLES = [
    {
        value: 'row',
        text: 'For Row',
        color: CHART_ROW_COLOR,
    },
    {
        value: 'col',
        text: 'For Column',
        color: CHART_COL_COLOR,
    },
];
