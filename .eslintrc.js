module.exports = {
    extends: [
        'plugin:vue/essential',
    ],
    env: {
        'node': true
    },
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'space-in-parens': ['error', 'never'],
        'no-duplicate-imports': 'error'
    }
};