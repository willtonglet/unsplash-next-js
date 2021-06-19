import purgecss from '@fullhuman/postcss-purgecss';

export const plugins = [
  'postcss-import',
  'tailwindcss',
  'autoprefixer',
  purgecss({
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
  }),
];
