const gulp = require('gulp');
const scss = require('gulp-sass');
const watchSass = require("gulp-watch-sass");
const concat_css = require('gulp-concat-css');
const minify_css = require('gulp-minify-css');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');
const run_sequence = require('run-sequence');

gulp.task('css-vendor', function () {
    return gulp.src([
        // 'node_modules/animate.css/animate.min.css',
        // 'node_modules/hamburgers/dist/hamburgers.min.css',
        // 'node_modules/bootstrap/dist/css/bootstrap.css',
        // 'node_modules/bootstrap-select/dist/css/bootstrap-select.css',
        // "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"
    ])
        .pipe(concat_css('vendor.css'))
        .pipe(minify_css({keepSpecialComments: false}))
        .pipe(gulp.dest('assets/css'))
        .pipe(notify({
            message: 'css-vendor success'
        }));
});


gulp.task('scripts', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/gijgo/js/gijgo.min.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        //'node_modules/bootstrap-select/dist/js/bootstrap-select.js',
        //'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'node_modules/object-fit-images/dist/ofi.min.js',
        'node_modules/wowjs/dist/wow.min.js',
        // 'node_modules/jquery.rateit/scripts/jquery.rateit.min.js',
        // 'node_modules/ckeditor/ckeditor.js',

    ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(notify({
            message: 'js success'
        }));
});
gulp.task('scss', function () {
    return gulp.src('assets/src/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
        .pipe(autoprefix({
            browsers: [
                '> 0.1%',
                'iOS >=7',
                'last 3 version',
                'firefox >= 4',
                'safari 7',
                'safari 8',
                'safari 5',
                'ie 8',
                'ie 9',
                'IE 10',
                'IE 11',
                'opera 12.1',
                'ios 6',
                'android 4'
            ],
            cascade: false
        }))
        .pipe(gulp.dest('assets/css'))
        .pipe(notify({
            message: 'scss success'
        }));
});


/*gulp.task('scss', function () {
    return gulp.src('assets/scss/style.scss')
        .pipe(scss().on('error', scss.logError))
        .pipe(gulp.dest('assets/css'));
});*/

gulp.task('scss:watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['scss']);
});

//gulp.task('default', function () {
    //run_sequence('scripts', 'scss', 'css-vendor');
//});
gulp.task('default', gulp.series('scss', 'scripts', function (done) {
    done();
}));