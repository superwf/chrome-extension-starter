module.exports = {
  presets: [
    '@babel/typescript',
    '@babel/react',
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '60',
        },
        // useBuiltIns: false,
        modules: false,
      },
    ],
  ],
  // env: {
  //   development: {
  //     presets: ['@babel/preset-env'],
  //   },
  //   production: {
  //     presets: [
  //       [
  //         '@babel/preset-env',
  //         {
  //           modules: false,
  //         },
  //       ],
  //     ],
  //   },
  // },
  // plugins: ['@babel/plugin-syntax-dynamic-import'],
}
