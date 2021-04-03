module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('@tailwindcss/jit'),
          require('autoprefixer'),
        ],
      },
    },
  }