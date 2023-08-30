module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
          "files": ['*.ts', '*.tsx'],
          "rules": {
            'import/order': [
              'error',
              {
                groups: ['external', 'builtin', 'internal', 'parent', 'sibling'],
                pathGroups: [
                  {
                    pattern: 'react+(|-native)',
                    group: 'external',
                    position: 'before',
                  },
                  {
                    pattern: '@+(routes|screens|components|hooks|theme)',
                    group: 'internal',
                    position: 'before',
                  },
                  {
                    pattern: './',
                    group: 'internal',
                    position: 'before',
                  },
                ],
                pathGroupsExcludedImportTypes: ['react+(|-native)'],
                alphabetize: {
                  order: 'asc',
                  caseInsensitive: true,
                },
                'newlines-between': 'always',
              },
            ],
          },
        },
      ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "import",
        "react"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": 0,
        "react/react-in-jsx-scope": 0,
    }
}
