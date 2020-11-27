const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const iconfontCss =   require('gulp-iconfont-css');
const concat = require ('gulp-concat');
const watch = require('gulp-watch');
const iconfont = require('gulp-iconfont');

gulp.task('server',()=>{
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
});

gulp.task('styles',()=>{
    return gulp.src('src/styles/*.+(scss|sass)')
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(rename((path)=>{
            path.basename += ".min";
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
})

gulp.task('watch',()=>{
    gulp.watch('src/styles/**/*.+(scss|sass)', gulp.parallel('styles')).on('change',browserSync.reload);
    gulp.watch('./*.html').on('change',browserSync.reload);
})
var fontName = 'icons';

//add svg icons to the folder "icons" and use 'iconfont' task for generating icon font
gulp.task('iconfont', async () => {
    gulp.src( 'src/assets/icons/*.svg' )
        .pipe( iconfontCss( {
            // где будет наш scss файл
            targetPath   : 'src/assets/styles/_icons.scss',
            // пути подлючения шрифтов в _icons.scss
            fontPath     : 'src/assets/fonts/',
            fontName    : fontName
        } ) )
        .pipe( iconfont( {
            fontName    : fontName,
            formats     : [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
            normalize   : true,
            fontHeight  : 1001
        } ) )
        .pipe( gulp.dest( 'src/assets/fonts' ) )
});

gulp.task('default', gulp.parallel('watch','server','styles'))