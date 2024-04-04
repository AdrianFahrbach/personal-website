/** @type {import('stylelint').Config} */

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-css-modules',
    'stylelint-config-recess-order',
  ],
  rules: {
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['after-same-name', 'inside-block'],
        ignoreAtRules: ['each', 'else', 'font-face', 'for', 'function', 'if', 'while', 'keyframes'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'each',
          'else',
          'error',
          'for',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'use',
          'forward',
          'at-root',
        ],
      },
    ],
    'color-function-notation': 'legacy',
    'color-named': null,
    'custom-property-no-missing-var-function': [],
    'declaration-empty-line-before': 'never',
    'function-name-case': null,
    'function-no-unknown': null,
    'length-zero-no-unit': true,
    'max-nesting-depth': [
      4,
      {
        ignore: ['pseudo-classes', 'blockless-at-rules'],
      },
    ],
    'no-duplicate-selectors': true,
    'no-descending-specificity': null,
    'no-invalid-double-slash-comments': null,
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
      },
    ],
    'selector-max-id': 2,
    'selector-pseudo-element-colon-notation': 'double',
  },
  plugins: ['stylelint-order'],
  defaultSeverity: 'warning',
};
