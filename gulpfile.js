const {
    src,
    dest,
    series,
    watch
} = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const image = require('gulp-image');
const fileInclude = require('gulp-file-include');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2woff = require('gulp-ttf2woff');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const Typograf = require('typograf');
const typograf = new Typograf({
    locale: ['ru']
});

let isProd = false; // dev by default

// gulpIf
const gulpIf = () => {
    return src('src/js/**/*.js')
        .pipe(gulpif(isProd, uglify()))
        .pipe(dest('app'));
};

// clean
const clean = () => {
    return del(['app']);
};

// fonts
const fonts = () => {
    return src('src/fonts/*')
        .pipe(fonter({
            formats: ['woff', 'woff2', 'ttf']
        }))
        .pipe(ttf2woff2())
        .pipe(ttf2woff())
        .pipe(dest('app/fonts'));
};

// svgSprite
const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true,
            },
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            },
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg",
                    example: true,
                    render: {
                        scss: {
                            dest: '../sprite.scss'
                        }
                    }
                }
            }
        }))
        .pipe(dest('app/img'));
};

// images
const images = () => {
    return src([
            'src/images/**/*.jpg',
            'src/images/**/*.jpeg',
            'src/images/**/*.png',
            'src/images/*.svg',
            'src/images/*.gif'
        ])
        .pipe(image())
        .pipe(dest('app/img'));
};

// styles
const styles = () => {
    return src('src/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('app'))
        .pipe(sourcemaps.write())
        .pipe(browserSync.stream());
};

// backendStyles
const backendStyles = () => {
    return src('src/styles/**/*.css')
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
};

// scripts
const scripts = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(sourcemaps.write())
        .pipe(dest('app'))
        .pipe(browserSync.stream());
};

// backendScripts
const backendScripts = () => {
    return src([
            'src/js/components/**/*.js',
            'src/js/main.js'
        ])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }).on('error', notify.onError()))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
};

// htmlMinify
const htmlMinify = () => {
    return src('src/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true,
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
};

// // watchFiles
// const watchFiles = () => {
//     if (!isProd) {
//         browserSync.init({
//             server: {
//                 baseDir: 'app'
//             }
//         });
//     }
// };

// htmlInclude
const htmlInclude = () => {
    return src('src/**/*.html')
        .pipe(plumber())
        .pipe(fileInclude({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(typograf)
        .pipe(dest('app'))
        .on('end', () => console.log('HTML Include task completed'))
        .pipe(browserSync.stream());
};

// resources
const resources = () => {
    return src('src/resources/**')
        .pipe(dest('app'));
};

// cache
const cache = () => {
    return src(`app/**/*.{css,js,svg,png,jpg,jpeg,webp,woff2}`, {
            base: 'app'
        })
        .pipe(rev())
        .pipe(revDel())
        .pipe(dest('app'))
        .pipe(rev.manifest('rev.json'))
        .pipe(dest('app'));
};

// rewrite
const rewrite = () => {
    const manifest = readFileSync('app/rev.json');
    src(`app/*.css`)
        .pipe(revRewrite({
            manifest
        }))
        .pipe(dest('app'));
    return src(`app/**/*.html`)
        .pipe(revRewrite({
            manifest
        }))
        .pipe(dest('app'));
};


// watch('src/**/*.html', htmlMinify);
// watch('src/**/*.html', htmlInclude);
// watch('src/**/*.css', styles);
// watch('src/**/*.js', scripts);
// watch('src/images/svg/**/*.svg', svgSprites);
// watch('src/resources/**', resources);

const toProd = (done) => {
    isProd = true;
    done();
};

const watchFiles = () => {
    if (!isProd) {
        browserSync.init({
            server: {
                baseDir: 'app'
            },
            open: false, // Opens browser automatically
            notify: false // Disable browserSync notifications
        });
    }
    watch('src/**/*.html', htmlInclude);
    watch('src/**/*.css', styles);
    watch('src/**/*.js', scripts);
    watch('src/images/svg/**/*.svg', svgSprites);
    watch('src/resources/**', resources);
};

exports.styles = styles;
exports.scripts = scripts;
exports.htmlMinify = htmlMinify;
exports.svgSprites = svgSprites;
exports.fonts = fonts;
exports.clean = clean;

exports.default = series(clean, htmlMinify, fonts, styles, scripts, resources, images, svgSprites, watchFiles);
exports.backend = series(clean, fonts, htmlInclude, backendScripts, backendStyles, resources, images, svgSprites);
exports.build = series(toProd, clean, fonts, scripts, styles, resources, images, svgSprites, htmlMinify);
exports.cache = series(cache, rewrite);
