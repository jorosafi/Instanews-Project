var gulp = require('gulp') // load gulp first
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    eslint = require('gulp-eslint'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    prettyError = require ('gulp-prettyerror');


//Gulp watch 
gulp.task('watch', function() { 
  gulp.watch('scss/*.scss', gulp.series('sass'));
  gulp.watch('js-files/*.js', gulp.series('scripts'));
});

//Sass Task
gulp.task("sass", function() {
  return gulp
    .src("./scss/style.scss")
    .pipe(sass())
    .pipe(prettyError())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

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



//Gulp browser sync
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(['*.html','build/css/*.css','build/js/*.js']).on('change',browserSync.reload);
});


 
// default task
gulp.task('default', gulp.parallel('watch', 'browser-sync'));


