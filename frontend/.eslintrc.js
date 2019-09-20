/* eslint-disable */
module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
    },
    extends: [
        'plugin:vue/recommended',
        '@vue/airbnb',
    ],
    rules: {
        'arrow-parens': ['error', 'always'],
        'brace-style': ['error', 'stroustrup'],
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],
        'implicit-arrow-linebreak': 'off',
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'indent': ['error', 4],
        'lines-between-class-members': ['error', 'never'],
        'no-confusing-arrow': ['error', {
            'allowParens': true
        }],
        'no-param-reassign': 'off',
        'no-shadow': ['error', {
            allow: ['state', 'getters'],
        }],
        'nonblock-statement-body-position': ['error', 'below'],
        'object-curly-spacing': ['error', 'never'],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': 'off',
        'vue/no-v-html': 'off',
        'vue/singleline-html-element-content-newline': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    }
};
