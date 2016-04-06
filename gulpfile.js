var browserSync = require('browser-sync').create()
var config = require('./gulp.config')()
var del = require('del')
var gulp = require('gulp')
var path = require('path')
var sass = require('gulp-sass')
var webpack = require('gulp-webpack')

gulp.task('default', ['build'])

gulp.task('start', ['build', 'watch-source'], function() {
  startBrowserSync()
})

gulp.task('build', ['build:js', 'build:html', 'build:css'])

gulp.task('build:html', function() {
  return gulp
    .src(config.htmlSource)
    .pipe(gulp.dest(config.htmlDestination))
})

gulp.task('build:js', function() {
  return gulp
    .src(config.javascriptSource)
    .pipe(webpack(
      { output: { filename: config.javascriptDestinationFilename },
        devtool: '#source-map'
      }))
    .pipe(gulp.dest(config.javascriptDestination))
})

gulp.task('build:css', ['clean-styles'], function () {
  console.log('Compiling Sass found here: ' + config.sassSource)
  console.log('And piping it here: ' + config.cssDestination)
  return gulp
    .src(config.sassSource)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestination))
})

gulp.task('clean-styles', function() {
  var files = config.cssDestination + '**/*.css'
  clean(files)
})

gulp.task('watch-source', ['default'], function () {
    gulp.watch(config.htmlSource, ['build:html'])
    gulp.watch(config.sassSource, ['build:css'])
    gulp.watch(config.javascriptSource, ['build:js'])
})

// TODO: Should pass in a callback to make sure it executes before 'sass'
function clean(path) {
  del(path)
    .then(console.log('Deleted previously generated CSS located here: ' + path))
}

function startBrowserSync() {
  if (browserSync.active) {
    return
  }
  console.log('Starting browserSync')
  browserSync.init({
      server: { baseDir: config.clientRoot }
  })
  gulp.watch(config.clientRoot + '**/*').on('change', browserSync.reload)
}
