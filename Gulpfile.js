var gulp = require('gulp');
var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var typescript = require('rollup-plugin-typescript');

gulp.task('default', ['bundle:all', 'bundle', 'bundle:loose', 'bundle:ts']);

gulp.task('bundle', function () {
  return rollup({
    entry: './script.js',
    plugins: [
      babel({
        presets: ['es2015-rollup']
      })
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: './out/bundle.js'
    });
  });
});

gulp.task('bundle:loose', function () {
  return rollup({
    entry: './script.js',
    plugins: [
      babel({
        presets: ['es2015-loose-rollup']
      })
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: './out/bundle-loose.js'
    });
  });
});

gulp.task('bundle:all', function () {
  return rollup({
    entry: './script.js',
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs(),
      babel({
        plugins: ['transform-runtime'],
        presets: ['es2015-loose-rollup']
      })
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: './out/bundle-all.js'
    });
  });
});

gulp.task('bundle:ts', function () {
  return rollup({
    entry: './script-ts.ts',
    plugins: [
      typescript()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: './out/bundle-ts.js'
    });
  });
});
