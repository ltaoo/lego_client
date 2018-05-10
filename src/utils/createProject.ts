// import * as fs from 'fs';
// import { remote } from 'electron';
import * as path from 'path';
import { copy } from 'fs-extra';

import {
  log,
} from './index';

const TEMPLATE_MAP = {
  1: 'lite',
};

export default function createProject (dir: string, type: number) {
  log(__dirname, path.resolve('./'));
  return copy(`./build/templates/${TEMPLATE_MAP[type]}`, dir);
}