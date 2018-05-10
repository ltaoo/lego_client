import { remote, ipcRenderer } from 'electron';

import _createProject from './createProject';

export const createProject = _createProject;

/**
 * 列出安装的包
 * @param {*} global - 是否全局
 */
export function lsPackages(global = false) {}

export function log(...args) {
    console.log(...args);
}

export function isUrl(url) {
  let matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matcher.test(url);
}

export function parse(data, key, all) {
  let arr = [],
    packages;
  try {
    packages = JSON.parse(data);
    if (key && packages[key]) {
      packages = packages[key];
      return Object.keys(packages).map(function(pkey) {
        return packages[pkey];
      });
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function showMessageBox(opts, cb = {}) {
  let name = opts.name;
  let action = opts.action;
  let version = opts.version;
  let message = 'Would you like to $action $name@version';

  message = message
    .replace('$action', action.toLowerCase())
    .replace('$name@version', () => {
      if (name && version) {
        return name + ' to version ' + version;
      } else if (name) {
        return name;
      } else {
        return '';
      }
    });
  remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      title: 'Confirmation',
      type: 'question',
      message: message,
      buttons: ['CANCEL', action],
    },
    btnIdx => {
      if (Boolean(btnIdx) === true) {
        cb();
      }
    },
  );
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
