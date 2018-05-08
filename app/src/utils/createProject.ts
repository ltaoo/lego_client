// import * as fs from 'fs';
// import { remote } from 'electron';

import { copy } from 'fs-extra';

const TEMPLATE_MAP = {
  1: 'lite',
};

export default function createProject (dir: string, type: number) {
  return copy(`./src/statics/templates/${TEMPLATE_MAP[type]}`, dir);
}