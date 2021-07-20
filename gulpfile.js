import del from 'del';
import browserSync from 'browser-sync';
import { pipeline } from 'readable-stream';
import eventStream from 'event-stream';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import sassCompiler from 'node-sass';
import sassImportOnce from 'node-sass-import-once';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import mediaQueriesGroup from 'gulp-group-css-media-queries';
import hash from 'gulp-hash-filename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import concatCss from 'gulp-concat-css';
import concatScripts from 'gulp-concat';
import pug from 'gulp-pug-3';
import inject from 'gulp-inject';
import sourcemaps from 'gulp-sourcemaps';
import cache from 'gulp-cache';

import { paths } from './scripts/paths.js';
import { message, transformInjectPath, extractDir } from './scripts/utils.js';

const { assign } = Object;

sass.compiler = sassCompiler;

browserSync.create();

const handleError = e => {
  return message.error(e)();
};

const deleteFolder = folder => {
  const remove = () => del(folder);
  return remove;
};

const reloadBrowser = async () => {
  return browserSync.reload();
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: './dev',
    },
    notify: false,
    open: false,
  });
};

const styles = () => pipeline(
  gulp.src([
    './node_modules/swiper/swiper-bundle.css',
    paths.styles.src,
  ]),
  sourcemaps.init(),
  plumber(handleError),
  sass({
    importer: sassImportOnce,
    importOnce: { css: true },
  }).on('error', sass.logError),
);

assign(styles, {
  dev: () => pipeline(
    styles(),
    sourcemaps.write(),
    message.log({
      title: 'Run task',
      message: 'styles:dev',
    }),
    gulp.dest(paths.styles.dev),
    browserSync.stream(),
  ),

  build: () => pipeline(
    styles(),
    concatCss('main.css', {
      rebaseUrls: false,
    }),
    message.log({
      title: 'Run task',
      message: 'styles:build',
    }),
    autoprefixer({ cascade: false }),
    mediaQueriesGroup(),
    cleanCSS({ level: 1 }),
    hash({ format: '{name}.{hash:8}{ext}' }),
    gulp.dest(paths.styles.build),
  ),
});

const scripts = () => pipeline(
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    './node_modules/focus-visible/dist/focus-visible.js',
    './node_modules/swiper/swiper-bundle.js',
    './src/js/helpers.js',
    './src/js/sidebar.js',
    './src/js/hero-swiper.js',
    paths.scripts.src,
  ]),
  sourcemaps.init(),
  plumber(handleError),
);

assign(scripts, {
  dev: () => pipeline(
    scripts(),
    cache(
      babel({
        presets: ['@babel/env'],
      }),
      { name: 'scripts' },
    ),
    message.log({
      title: 'Run task',
      message: 'scripts:dev',
    }),
    sourcemaps.write(),
    gulp.dest(paths.scripts.dev),
    browserSync.stream(),
  ),

  build: () => pipeline(
    scripts(),
    message.log({
      title: 'Run task',
      message: 'scripts:build',
    }),
    concatScripts('main.js'),
    babel({
      presets: ['@babel/env'],
    }),
    uglify(),
    hash({ format: '{name}.{hash:8}{ext}' }),
    gulp.dest(paths.scripts.build),
  ),
});

const templates = () => pipeline(
  gulp.src(paths.templates.src),
  plumber(handleError),
  pug({
    pretty: true,
    basedir: `${extractDir(import.meta)}/src`,
  }),
);

assign(templates, {
  dev: () => pipeline(
    templates(),
    message.log({
      title: 'Run task',
      message: 'templates:dev',
    }),
    inject(eventStream.merge(
      styles.dev(),
      scripts.dev(),
    ), {
      transform: transformInjectPath,
    }),
    gulp.dest(paths.templates.dev),
  ),

  build: () => pipeline(
    templates(),
    message.log({
      title: 'Run task',
      message: 'templates:dev',
    }),
    inject(eventStream.merge(
      styles.build(),
      scripts.build(),
    ), {
      transform: transformInjectPath,
    }),
    gulp.dest(paths.templates.build),
  ),
});

const images = () => pipeline(
  gulp.src(paths.images.src),
  plumber(handleError),
);

assign(images, {
  dev: () => pipeline(
    images(),
    message.log({
      title: 'Run task',
      message: 'images:dev',
    }),
    gulp.dest(paths.images.dev),
  ),

  build: () => pipeline(
    images(),
    message.log({
      title: 'Run task',
      message: 'images:build',
    }),
    imagemin([
      imagemin.gifsicle({
        interlaced: true,
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true,
      }),
      imagemin.optipng({
        optimizationLevel: 5,
      }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]),
    gulp.dest(paths.images.build),
  ),
});

const fonts = () => pipeline(
  gulp.src(paths.fonts.src, {
    since: gulp.lastRun(fonts),
  }),
  plumber(handleError),
);

assign(fonts, {
  dev: () => pipeline(
    fonts(),
    message.log({
      title: 'Run task',
      message: 'fonts:dev',
    }),
    gulp.dest(paths.fonts.dev),
  ),

  build: () => pipeline(
    fonts(),
    message.log({
      title: 'Run task',
      message: 'fonts:build',
    }),
    gulp.dest(paths.fonts.build),
  ),
});

const watcher = () => {
  gulp.watch(paths.templates.watch, gulp.series(templates.dev, reloadBrowser));
  gulp.watch(paths.scripts.watch, gulp.series(templates.dev, reloadBrowser));
  gulp.watch(paths.styles.watch, gulp.series(templates.dev, reloadBrowser));
  gulp.watch(paths.fonts.watch, gulp.series(fonts.dev, reloadBrowser));
  gulp.watch(paths.images.watch, gulp.series(images.dev, reloadBrowser));
};

export const remove = gulp.parallel(deleteFolder('dev'), deleteFolder('build'));
export const watch = gulp.series(watcher);

export const dev = gulp.series(
  deleteFolder('dev'),
  gulp.parallel(templates.dev, images.dev, fonts.dev),
  server,
);

export const build = gulp.series(
  deleteFolder('build'),
  gulp.parallel(templates.build, images.build, fonts.build),
);

export default gulp.parallel(dev, watch);
