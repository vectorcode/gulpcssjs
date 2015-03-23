var gulp = require('gulp');  
var browserify = require('gulp-browserify');  
var concat = require('gulp-concat');
var styl = require('gulp-styl');  
var refresh = require('gulp-livereload');  
var lr = require('tiny-lr');  
var server = lr();

gulp.task('scripts', function() {  
    gulp.src(['src/*.js'])
        .pipe(browserify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
})

gulp.task('styles', function() {  
    gulp.src(['css/*.css'])
        .pipe(styl({compress : true}))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('build'))
        .pipe(refresh(server))
})

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {  
    gulp.run('lr-server', 'scripts', 'styles');

    gulp.watch('src/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('css/**', function(event) {
        gulp.run('styles');
    })
})