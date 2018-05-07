import * as fs from 'fs';

const TEMPLATE_MAP = {
  1: 'lite',
};

export default function createProject (path: string, type: number) {
  fs.createReadStream(`./templates/${TEMPLATE_MAP[type]}`).pipe(fs.createWriteStream(path));
}