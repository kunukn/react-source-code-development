module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        // targets: {
        //   node: '6.5', /* ES2015 compilation target */
        // },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.css', '.scss'],
        root: ['./src'],
        alias: {
          root: '.',
          src: './src',
          components: './src/components',
        },
      },
    ],
  ],
};
