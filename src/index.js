import fs from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';


const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtension = (filepath) => path.extname(filepath);

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const readFile1 = readFile(getFullPath(filepath1));
  const readFile2 = readFile(getFullPath(filepath2));

  const extension1 = getExtension(filepath1);
  const extension2 = getExtension(filepath2);

  const parsedFile1 = parseFile(readFile1, extension1);
  const parsedFile2 = parseFile(readFile2, extension2);
};

export default genDiff;