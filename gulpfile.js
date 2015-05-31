var del = require('del');
var lazypipe = require('lazypipe');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// globally handle all missed error events
var gulp_src = gulp.src;
gulp.src = function() {
    return gulp_src.apply(gulp, arguments).pipe($.plumber(function(error) {
        $.util.log($.util.colors.red('Error (' + error.plugin + '): ' + error.message), $.util.colors.red(error.stack));
        this.emit('end');
    }));
};

gulp.task('clean', function() {
    del(['dist/*', 'reports', 'debug', '.coverdata']);
});

gulp.task('analyse', function() {
    gulp.src(['src/logging-enhancer.js'])
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('build', ['clean', 'analyse'], function() {
    gulp.src(['src/logging-enhancer.js'])
        .pipe($.concat("logging-enhancer.js"))
        .pipe(gulp.dest('dist'));
});

gulp.task('dist', ['build'], function() {
    gulp.src(['src/logging-enhancer.js'])
        .pipe($.uglify())
        .pipe($.concat("logging-enhancer.min.js"))
        .pipe(gulp.dest('dist'));
});

var testAndGather = lazypipe()
    .pipe($.coverage.instrument, {
        pattern: ['src/**/*.js'],
        debugDirectory: 'debug'
    })
    .pipe($.jasmine, {includeStackTrace: true})
    .pipe($.coverage.gather);

gulp.task('test', ['build'], function () {
    gulp.src('spec/**/*spec.js')
        .pipe(testAndGather())
        .pipe($.coverage.format(['html']))
        .pipe(gulp.dest('reports'));
});

gulp.task('travis', ['build'], function () {
    gulp.src('spec/**/*spec.js')
        .pipe(testAndGather())
        .pipe($.coverage.format(['lcov']))
        .pipe($.coveralls());
});

gulp.task('default', ['build'], function() {});