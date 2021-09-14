const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass',()=>
    gulp.src('./styles/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./styles/css'))
);
