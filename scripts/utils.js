import { dirname } from 'path';
import { fileURLToPath } from 'url';
import notify from 'gulp-notify';

/**
 * @typedef {Object} NotifierParams
 * @property {string} [message=undefined]
 * @property {string} [title=undefined]
 */

/**
 * @param {{
 *   type: 'log' | 'error',
 *   title: string,
 * }}
 * @return {function(string | NotifierParams)}
 */
const fabricLogger = ({ type, title }) => msg => {
  const notifier = type === 'error' ? notify.onError.bind(notify) : notify;
  const isString = typeof msg == 'string';

  return notifier({
    onLast: true,
    title: isString ? title : msg?.title ?? '',
    message: isString ? msg : msg?.message ?? '',
    notifier: (_, done) => {
      console[type](' ------------------------------------- ');
      done();
    },
  });
};

export const message = {
  log: fabricLogger({ title: 'Log', type: 'log' }),
  error: fabricLogger({ title: 'Error', type: 'error' }),
};

export const transformInjectPath = filename => {
  const path = filename.replace(/^\/(build|dev)/, '');

  if (/\.css$/.test(path)) {
    return `<link rel="stylesheet" href="${path}">`;
  }

  if (/\.js$/.test(path)) {
    return `<script src="${path}" defer></script>`;
  }
}

/**
 * @param {ImportMeta} meta
 * @return {string}
 */
export const extractDir = meta => dirname(fileURLToPath(meta.url));
