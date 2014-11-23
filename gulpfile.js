var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
var del = require('del');
var runSequence = require('run-sequence');

var protractor = plugins.protractor.protractor;
var webdriver_update = plugins.protractor.webdriver_update;
var webdriver_standalone = plugins.protractor.webdriver_standalone;
var pathsSrc = {
    index: 'src/index.html',
    partials: 'src/partials/*',
    less: ['src/less/*.less', '!src/less/components/**/*.less', '!src/less/modules/**/*.less', '!src/less/utilities/**/*.less'],
    lessWatch: ['src/less/**/*.less'],
    scripts: ['src/js/**/*.js'],
    images: 'src/assets/img/**/*',
    fonts: 'src/assets/fonts/**/*',
    fontAwesome: 'libraries/font-awesome-4.2.0/fonts/*'
};
var pathsBuild = {
    index: 'build/index.html',
    css: ['build/css/*.css'],
    scripts: ['build/js/*.js'],
    images: 'build/assets/img/**/*'
};

gulp.task('clean', function(cb) {
    return del(['build','.tmp'], cb);
});

gulp.task('font-awesome', function() {
    return gulp.src(pathsSrc.fontAwesome)
        .pipe(gulp.dest('build/assets/fonts/font-awesome'));
});
gulp.task('fonts', function() {
    return gulp.src(pathsSrc.fonts)
        .pipe(gulp.dest('build/assets/fonts'));
});
gulp.task('index', function() {
    var assets = plugins.useref.assets();
    return gulp.src(pathsSrc.index)
        .pipe(plugins.plumber())
        .pipe(assets)
        .pipe(plugins.if('*.js', plugins.uglify({
            mangle: false
        })))
        .pipe(plugins.if('*.css', plugins.minifyCss()))
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(gulp.dest('build'));
});
gulp.task('index-run',function(callback){
    runSequence('less','scripts', 'index', callback);
});
gulp.task('index-run-less',function(callback){
    runSequence('less', 'index', callback);
});
gulp.task('index-run-scripts',function(callback){
    runSequence('scripts','index', callback);
});
gulp.task('partials', function() {
    return gulp.src(pathsSrc.partials)
        .pipe(gulp.dest('build/partials'));
});
gulp.task('less', function() {
    return gulp.src(pathsSrc.less)
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer("last 8 version", "> 1%", "ie 8", "ie 7"), {
            cascade: true
        })
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('.tmp/css'));
});
gulp.task('scripts', function() {
    return gulp.src(pathsSrc.scripts)
        .pipe(plugins.plumber())
        .pipe(plugins.uglify({
            mangle: false
        }))
        .pipe(plugins.jshint())
        .pipe(gulp.dest('.tmp/js'));
});
gulp.task('images', function() {
    return gulp.src(pathsSrc.images)
        .pipe(plugins.imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('build/assets/img'));
});
gulp.task('connect', function() {
    return plugins.connect.server({
        root: 'build',
        host: '127.0.0.1',
        port: 9000
    });
});

gulp.task('webdriver-update', webdriver_update);
gulp.task('webdriver-start', ["webdriver-update"], webdriver_standalone);

gulp.task('tests-protractor', function(cb) {
    return gulp.src('tests/scenarios/functional-tests.js', {
        read: false
    }).pipe(protractor({
        configFile: 'tests/protractor.config.js'
    })).on('error', function(e) {
        console.log(e);
        plugins.connect.serverClose();
    }).on("end", function() {
        plugins.connect.serverClose();
    });
});

gulp.task('tests', ['connect'], function() {
    gulp.start('tests-protractor');
});

gulp.task('watch', function() {
    var server = plugins.livereload();
    gulp.watch(pathsSrc.index, ['index-run']);
    gulp.watch(pathsSrc.partials, ['partials']);
    gulp.watch(pathsSrc.fontAwesome, ['font-awesome']);
    gulp.watch(pathsSrc.fonts, ['fonts']);
    gulp.watch(pathsSrc.lessWatch, ['index-run-less']);
    gulp.watch(pathsSrc.scripts, ['index-run-scripts']);
    gulp.watch(pathsSrc.images, ['images']);
    gulp.watch([pathsBuild.index, pathsBuild.css, pathsBuild.scripts, pathsBuild.images]).on('change', function(event) {
        server.changed(event.path);
    });
});

gulp.task('default', function(callback) {
    runSequence('clean','watch', 'connect', 'less', 'images', 'font-awesome', 'fonts', 'scripts', 'partials', 'index', callback);
});