const gulp         = require('gulp');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const del          = require('del');
const browserSync  = require('browser-sync').create();

// CSS files to concat
const cssFiles = ['./src/css/main.css', './src/css/media.css'];
// JS files to concat
const jsFiles = ['./src/js/lib.js', './src/js/main.js'];

// Task for concat, minify and live-reloading CSS files
gulp.task('styles', () => {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            compability: 'ie8',
            level: 2
        }))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream());
});

// Task for concat, minify and live-reloading JS files
gulp.task('scripts', () => {
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./build/js/'))
    .pipe(browserSync.stream());
});

// Task for watching for CSS, JS and HTML files
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./src/css/**/*.css', gulp.series('styles'));
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'));
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Task for delete files in ./src/* before building
gulp.task('clean', () => {
    return del(['build/*']);
});

// Final task for building and watching the project
gulp.task('dev', gulp.series('clean', gulp.parallel('styles', 'scripts'), 'watch'));
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts')));
