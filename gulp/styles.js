var
gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cssnano = require('gulp-cssnano'),
rename = require('gulp-rename'),
sassPath = 'scss/**/*.scss';

// Provide details of Sass errors
function throwSassError(sassError) {
  throw new gutil.PluginError({
    plugin: 'sass',
    message: util.format(
      "Sass error: '%s' on line %s of %s",
      sassError.message,
      sassError.line,
      sassError.file
    )
  });
}

// Build Sass for local development
gulp.task('sass:develop', function() {
  return gulp.src(sassPath)
    .pipe(sass({ style: 'expanded', errLogToConsole: true }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('build/css/'));
});

// Build Sass for production
gulp.task('sass:build', function() {
  return gulp.src(sassPath)
    .pipe(sass({
      style: 'expanded',
      errLogToConsole: true,
      onError: throwSassError
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'));
});
