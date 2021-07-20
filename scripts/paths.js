import path from 'path';

import { extractDir } from './utils.js';

export const paths = {
  templates: {
    src: [
      'src/[!_]*.pug',
      'src/pages/**/[!_]*.pug',
    ],
    watch: 'src/**/*.pug',
    build: 'build/',
    dev: 'dev/',
  },
  styles: {
    src: 'src/styles/**/[!_]*.{css,scss}',
    watch: 'src/**/*.{css,scss}',
    build: 'build/css',
    dev: 'dev/css',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    watch: 'src/**/*.js',
    build: 'build/js',
    dev: 'dev/js',
  },
  images: {
    src: 'src/assets/images/**/*.*',
    watch: 'src/assets/images/**/*.*',
    build: 'build/assets/images',
    dev: 'dev/assets/images',
  },
  fonts: {
    src: 'src/assets/fonts/**/*.*',
    watch: 'src/assets/fonts/**/*.*',
    build: 'build/assets/fonts',
    dev: 'dev/assets/fonts',
  },
};

export const aliases = {
  '~': path.join(extractDir(import.meta), '..', 'node_modules/'),
};
