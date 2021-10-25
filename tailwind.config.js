/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  darkMode: "class",
  jit: true,
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f'
      },
    },
    container: {
      center: true,
      screens: {
        md: '1200px'
      }
    },
  }
};
