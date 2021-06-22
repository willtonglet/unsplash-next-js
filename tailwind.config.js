module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      gridTemplateColumns: {
        'grid-cols-topic-header': 'max-content 1fr [column-end]',
        'grid-cols-topic-box-info': 'repeat(3,[col-start] 1fr)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
