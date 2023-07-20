module.exports = {
  presets: [['@vue/app', { useBuiltIns: 'entry' }]],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true }],
  ],
  sourceType: 'unambiguous',
}
