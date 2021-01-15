import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import visualizer from 'rollup-plugin-visualizer';
import path from 'path';

import jsxPlugin from '@babel/plugin-transform-react-jsx';
import classProps from '@babel/plugin-proposal-class-properties';

export default {
  input: './src/index.js',
  output: {
    file: path.resolve(__dirname, 'dist', 'sn-table.js'),
    name: 'A Table',
    format: 'umd',
    exports: 'default',
    sourcemap: true,
    globals: {
      '@nebula.js/stardust': 'stardust',
    },
  },
  external: ['@nebula.js/stardust'],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    external(),
    postcss(),
    babel({
      babelrc: false,
      include: ['src/**'],
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: {
              browsers: ['last 2 Chrome versions'],
            },
          },
        ],
        ['@babel/react'],
      ],
      plugins: [[jsxPlugin], [classProps]],
    }),
    commonjs(),
    image(),
    visualizer(),
  ],
};