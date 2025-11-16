const baseConfig = require('./.stylelintrc.js');

module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'order/properties-order': [
      [
        // Example order, adjust as needed
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'display',
        'flex',
        'width',
        'height',
        'margin',
        'padding',
        'font-size',
        'color',
        'background',
        'border',
        'box-shadow',
        'transition',
      ],
      { unspecified: 'bottomAlphabetical' },
    ],
  },
};
