'use strict';

const gulp         = require('gulp'),
      autoprefixer = require('gulp-autoprefixer'),
      uglify       = require('gulp-uglify'),
      rimraf       = require('rimraf'),
      sourcemaps   = require('gulp-sourcemaps'),
      sass         = require('gulp-sass'),
      cssmin       = require('gulp-minify-css'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      rigger       = require('gulp-rigger'),
      browserSync  = require('browser-sync').create();

const path = {
    build: {
        html: 'build/',
        js:  'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        styles: 'src/styles/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        styles: 'src/styles/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

const config = {
    server: {
        baseDir: './build'
    },
    tunnel: true,
    host: 'localhost',
    port: 9000
};

gulp.task('html:build', () => {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', () => {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles:build', () => {
    return gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image:build', () => {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build', () => {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('watch', () => {
    browserSync.init(config);

    gulp.watch(path.watch.html, gulp.series('html:build')).on('change', browserSync.reload);
    gulp.watch(path.watch.styles, gulp.series('styles:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

// Final task for building, cleaning and watching the project
gulp.task('build', gulp.parallel('html:build', 'styles:build', 'js:build', 'image:build', 'fonts:build'));

gulp.task('clean', (cb) => {
    rimraf(path.clean, cb);
});

gulp.task('default', gulp.series('build', 'watch'));
