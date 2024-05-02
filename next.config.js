const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  webpack: config => {
    config.module.rules.push({
      test: /placeholders\/.+\.svgPlaceholder$/,
      type: 'asset/source',
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svgPlaceholder': ['raw-loader'],
      },
    },
  },
};
