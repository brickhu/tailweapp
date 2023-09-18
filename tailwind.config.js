module.exports = {
  content: ['./src/**/*.{wxml,js,ts}'],
  presets: [
    require('./atomify/index')({
      themes: null,
    }),
  ]
}
