var gulp = require('gulp')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulpSequence = require('gulp-sequence')
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var proxy = require('http-proxy-middleware'); // 请求代理

let staticSrc = 'dist'
// img
gulp.task('image', function () {
  return gulp.src('src/img/*.*')
    .pipe(gulp.dest(staticSrc + '/img/')) //改变后的位置
});
// js脚本
gulp.task('scriptsJs', function () {
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify()) //压缩js
    .pipe(gulp.dest(staticSrc + '/js/'))
});
// lib
gulp.task('copyLib', function () {
  return gulp.src('src/lib/*.*')
    .pipe(gulp.dest(staticSrc + '/lib/'))
})
// browserify
// gulp.task("browserify", function () {
//   var b = browserify({
//       entries: staticSrc + "/js/app.js"
//   });
//   return b.bundle()
//       .pipe(source("main.js"))
//       .pipe(gulp.dest(staticSrc + "/js"));
// });
// less
gulp.task('less', function () {
  var plugins = [
    autoprefixer({
      browsers: ['last 50 version']
    }),
    cssnano()
  ];
  return gulp.src('src/less/**/*.less')
    .pipe(plumber())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(staticSrc + '/css'));
});
//index.html
gulp.task('indexhtml', function () {
  return gulp.src('src/*.html')
    // .pipe(htmlmin(htmlOption))
    .pipe(gulp.dest(staticSrc + '/'))
});
// //html
// gulp.task('html', function() {
//   return gulp.src('src/html/*.html')
//     .pipe(htmlmin(htmlOption))
//     .pipe(gulp.dest(staticSrc +'/html'))
// });
var jsonPlaceholderProxy = proxy('/index.php', {
  target: 'http://www.aihuaju.com',
  changeOrigin: true,
  logLevel: 'debug'
})
//预设任务
gulp.task('default', gulpSequence('indexhtml', 'scriptsJs', 'copyLib', 'less', 'image', function () {
  browserSync.init({
    server: {
      baseDir: staticSrc + '/',
      middleware: [jsonPlaceholderProxy]
    }
  })
  // 监视所有css、js、html、less
  gulp.watch('src/less/*.less', ['less']).on('change', browserSync.reload)
  gulp.watch('src/img/*.{png,jpg}', ['image']).on('change', browserSync.reload)
  gulp.watch('src/js/*.js', ['scriptsJs']).on('change', browserSync.reload)
  gulp.watch('src/*.html', ['indexhtml']).on('change', browserSync.reload)
  gulp.watch('src/html/*.html', ['html']).on('change', browserSync.reload)
  gulp.watch('src/lib/*.*', ['copyLib']).on('change', browserSync.reload)
}))

gulp.task('build', function () {
  gulp.src(staticSrc + '/*')
    .pipe(zip(staticSrc + '.zip'))
    .pipe(gulp.dest(staticSrc));
})