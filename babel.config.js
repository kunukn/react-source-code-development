module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        modules: false,
        // targets: {   node: '6.5', /* ES2015 compilation target */ },
      }
    ],
    '@babel/preset-react',
    '@babel/preset-flow'
  ],
  plugins: [
    [
      "@babel/plugin-proposal-decorators", {
        "decoratorsBeforeExport": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties", {
        "loose": true
      }
    ],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    [
      'module-resolver', {
        extensions: [
          '.js', '.jsx', '.css', '.scss'
        ],
        root: ['./src'],
        alias: {
          root: '.',
          src: './src',
          components: './src/components'
        }
      }
    ]
  ]
};
