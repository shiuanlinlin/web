var gulp = require('gulp'),
    sass = require('gulp-sass'),
    //前綴檔案
    postcss = require('gulp-postcss'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    //前綴檔案
    postcssPresetEnv = require('postcss-preset-env');

sass.compiler = require('node-sass');

gulp.task('hello_world',() => {
    console.log('my first gulp task');
});

//browser-sync
gulp.task('sync',() => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

//pug 編譯不執行壓縮
gulp.task('pug', () => {
  return gulp
    .src('./pug/*')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('./dist'))
    //刷新
    .pipe(browserSync.stream());
});

//sass 編譯不執行壓縮
gulp.task('sass', () => {
  //前綴檔案
  var processors = [
    postcssPresetEnv({
      browsers: ['last 3 version','> 0.2%'],
      stage: 3 // 該stage選項根據要成為Web標準的過程中的穩定性來確定要填充的CSS功能。
      //stage可以是0（實驗）通過4（穩定）
    })
  ];
  // https://www.npmjs.com/package/postcss-preset-env
  //檔案來源
  return gulp
    .src(['./sass/*.sass'])    
    //不執行壓縮
    .pipe(sass().on('error', sass.logError))
    //前綴檔案
    .pipe(postcss(processors))
    //檔案完成後放置處
    .pipe(gulp.dest('./dist/css'))
    //刷新
    .pipe(browserSync.stream());
});

//sass 執行壓縮
gulp.task('sass-d', () => {
  //前綴檔案
  var processors = [
    postcssPresetEnv({
      browsers: ['last 3 version','> 0.2%'],
      stage: 3 // 該stage選項根據要成為Web標準的過程中的穩定性來確定要填充的CSS功能。
      //stage可以是0（實驗）通過4（穩定）
    })
  ];
  //檔案來源
  return gulp
    .src(['./sass/style.sass'])
    //執行壓縮
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    //前綴檔案
    .pipe(postcss(processors))
    //檔案完成後放置處
    .pipe(gulp.dest('./dist/css'));
});

//pug 執行壓縮
gulp.task('pug-d', () => {
  return gulp
    .src('./pug/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
});

//不壓縮 gulp watch 
gulp.task('watch', () => {
    // 監看的路徑檔案以及執行sass這項task
    gulp.watch('./sass/*.sass', gulp.parallel('sass'));
    gulp.watch('./pug/*.pug', gulp.parallel('pug'));
    gulp.watch('./pug/templates/*.pug', gulp.parallel('pug'));
    gulp.watch('./pug/config/*.pug', gulp.parallel('pug'));
});
/*--------------------壓縮打包------------------*/
gulp.task('bundle', gulp.parallel('sass-d','pug-d'));
/*--------------------sync------------------*/
gulp.task('serve', gulp.parallel('sync', 'watch'));