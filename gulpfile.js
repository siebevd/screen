var browserify = require('browserify'),
    source = require('vinyl-source-stream'), // Transforming browserify so we can use it with gulp
    watchify = require('watchify'),
    buffer = require('vinyl-buffer'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'), // Fixes watch task on error
    notify = require('gulp-notify'), // Get Mac Notifications when a task is finished
    prefixer = require('gulp-autoprefixer'), // Prefix css with different browser stuff
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    assign = require('lodash.assign'),
    webserver = require('gulp-webserver'),
    uglify = require('gulp-uglify');


/**
 * Setup an easy server, so we can have a look at it
 */

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      fallback: 'index.html',
      port: 8080
    }));
});


/**
 * Styles (process all the css, scss files)
 */


gulp.task('styles', function() {
   gulp.src('./scss/style.scss')
     .pipe(plumber({errorHandler: notify.onError("<%= error.fileName %> [<%= error.lineNumber %>]: <%= error.message %>")}))
     .pipe(sass())
     .pipe(prefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
     .pipe(minifyCSS())
     .pipe(rename({suffix: '.min'}))
     .pipe(gulp.dest('./css'))
     .pipe(notify({ message: 'Styles task complete -- Minified' }));
 });


 /**
  * Javascript ( compress the js files )
  */


var browserifyOpts = {
  entries: './js-dev/app.js',
  debug:true
};

var opts = assign({}, watchify.args, browserifyOpts);
var watchJs = watchify(browserify(opts));

gulp.task('browserify',brwsrfy);
watchJs.on('update', brwsrfy); // Watch for updates happening on any of the required files
watchJs.on('log', gutil.log); // output build logs to terminal


function brwsrfy() {
  return watchJs.bundle()
    .on("error", notify.onError(function (error) {
      return "ERROR: " + error.message;
      this.emit('end');
    }))
    .pipe(source('app.js')) // Give the new compiled file a name, app.js in this case
    .pipe(buffer()) // Transform to a stream we can use in gulp
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./js'));
}


/**
 * Gulp Commands
 */

gulp.task('default', ['webserver','styles','browserify','watch']);


/**
 * Watch files to update them on change
 */

gulp.task('watch', function() {
   // Watch .scss files
   gulp.watch('./scss/**/**.scss',['styles']);
});
