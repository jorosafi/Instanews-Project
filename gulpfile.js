var gulp = require('gulp') // load gulp first
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint');


//eslint task
gulp.task('lint', function(){
  return gulp.src('js-files/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError());
});

//Gulp ugligy task
gulp.task('scripts', gulp.series('lint', function(){
  return gulp.src('js-files/*.js')
  .pipe(uglify()) //call uglify function on files
  .pipe(rename({extname: '.min.js'}))//renaming the new ugly file
  .pipe(gulp.dest('build/js'))
}))

//Gulp watch 
gulp.task('watch', function() {
  gulp.watch('js-files/*.js', gulp.series('scripts'));
});

//Gulp browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });

  gulp.watch('build/js/*js').on('change',browserSync.reload);
});


 
 
gulp.task('default', gulp.parallel('watch', 'lint', 'browser-sync'));


