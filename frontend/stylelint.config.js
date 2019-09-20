/* eslint-disable */
module.exports = {
    root: true,
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
    ],
    rules: {
        'indentation': 4,
        'at-rule-no-unknown': [true, {
            'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin']
        }],
    }
};
