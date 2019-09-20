/**
 * Possible types of seasonal component
 */
export const STL_MODEL_ADDITIVE = 'additive';
export const STL_MODEL_MULTIPLICATIVE = 'multiplicative';
export const STL_MODELS = [
    {
        value: STL_MODEL_ADDITIVE,
        text: 'Additive',
    },
    {
        value: STL_MODEL_MULTIPLICATIVE,
        text: 'Multiplicative',
    },
];
