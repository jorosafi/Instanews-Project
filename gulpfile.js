var gulp = require('gulp') // load gulp first
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('default', function(){
  gulp.src('js-files/*.js')
    .pipe(uglify()) //call uglify function on files
    .pipe(rename({extname: '.min.js'}))//renaming the new ugly file
    .pipe(gulp.dest('build/js'))
});

