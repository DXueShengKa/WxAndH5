// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'webpack5',
      useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
    }]
  ]
}
