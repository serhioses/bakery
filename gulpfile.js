const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const watch = require('gulp-watch');

const path = require('path');

const devDir = path.resolve(__dirname, 'src');
const distDir = path.resolve(__dirname, 'public/assets');
const paths = {
  sass: path.resolve(devDir, 'sass'),
  cssDist: path.resolve(distDir, 'css'),
  };
const browsers = ['> 3%'];

gulp.task('styles', function () {
  return gulp.src(paths.sass + '/style.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [paths.sass]
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers
    }))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass + '/**/*.scss', gulp.series('styles'));
});

gulp.task('default', gulp.parallel('watch', gulp.series('styles')));
