// eslint.config.cjs

const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const typescriptEslintParser = require('@typescript-eslint/parser');
const angularEslintPlugin = require('@angular-eslint/eslint-plugin');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
    {
        ignores: ['dist', 'node_modules'],
    },
    {
        files: ['**/*.ts'],
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            '@angular-eslint': angularEslintPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
        },
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: process.cwd(),
                sourceType: 'module',
            },
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'es5',
                    printWidth: 80,
                },
            ],
            indent: ['error', 4],
            'no-console': 'warn',
            'no-debugger': 'error',
            'import/no-unresolved': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                    'newlines-between': 'always',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-definitions': [
                'error',
                'interface',
            ],
            '@typescript-eslint/no-restricted-types': [
                'error',
                {
                    types: {
                        Function: {
                            message:
                                'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                        },
                        '{}': {
                            message:
                                'Avoid using the empty object type `{}`. Consider using `object` or a more specific type.',
                        },
                        Object: {
                            message:
                                'Avoid using the `Object` type. Did you mean `object`?',
                        },
                        String: {
                            message:
                                'Avoid using the `String` type. Did you mean `string`?',
                        },
                        Boolean: {
                            message:
                                'Avoid using the `Boolean` type. Did you mean `boolean`?',
                        },
                        Number: {
                            message:
                                'Avoid using the `Number` type. Did you mean `number`?',
                        },
                    },
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/no-empty-lifecycle-method': 'warn',
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json',
                    alwaysTryTypes: true,
                },
            },
        },
    },
];
