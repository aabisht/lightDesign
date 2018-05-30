var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    cssmin = require('gulp-cssmin'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglifyjs');
    sourcemaps = require('gulp-sourcemaps');


var paths = {
    css: [
        'app/dist/css/style.css'
    ],
    js: [
        'app/js/light-design.js',
        'app/js/forms.js'
    ]
}


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './app/'
    },
    port: 5656
  })
})

// Compile SCSS to CSS
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/dist/css'));
})

// Compiles CSS to compressed CSS and add min ext
gulp.task('compressCss', function() {
    gulp.src(paths.css)
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(rename({suffix : '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
})

// Uglify and minify JS to min ext
gulp.task('uglify', function(){
    gulp.src(paths.js)
        .pipe(plumber())
        .pipe(uglify('light-design', {
          mangle: true,
          output: {
            beautify: false
          },
    	  compress: {
    		sequences     : true,  // join consecutive statemets with the “comma operator”
    		properties    : true,  // optimize property access: a["foo"] → a.foo
    		dead_code     : true,  // discard unreachable code
    		drop_debugger : true,  // discard “debugger” statements
    		unsafe        : false, // some unsafe optimizations (see below)
    		conditionals  : true,  // optimize if-s and conditional expressions
    		comparisons   : true,  // optimize comparisons
    		evaluate      : true,  // evaluate constant expressions
    		booleans      : true,  // optimize boolean expressions
    		loops         : true,  // optimize loops
    		unused        : true,  // drop unused variables/functions
    		hoist_funs    : true,  // hoist function declarations
    		hoist_vars    : false, // hoist variable declarations
    		if_return     : true,  // optimize if-s followed by return/continue
    		join_vars     : true,  // join var declarations
    		cascade       : true,  // try to cascade `right` into `left` in sequences
    		side_effects  : true,  // drop side-effect-free statements
    		warnings      : true,  // warn about potentially dangerous optimizations/code
    		global_defs   : {}     // global definitions
    	  }
        }))
        .pipe(minify({
            exclude: [],
            ignoreFiles: []
        }))
        .pipe(rename({suffix : '.min.js'}))
        .pipe(gulp.dest('app/dist/js/'))
});

gulp.task('watch', ['browserSync', 'sass', 'compressCss', 'uglify'], function(){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch(paths.css, ['compressCss']);
    gulp.watch(paths.js, ['uglify']);

    // Reloads the browser whenever HTML or JS files change
    gulp.watch('./**/*.html', browserSync.reload);
    gulp.watch('app/dist/js/**/*.js', browserSync.reload);
    gulp.watch('app/dist/css/**/*.css', browserSync.reload);
});