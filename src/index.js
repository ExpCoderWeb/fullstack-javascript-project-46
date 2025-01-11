import fs from 'node:fs';
import path from 'node:path';
import parseFile from './parsers.js';
import getDiff from './getDiff.js';
import stylish from './formatters/stylish.js';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getExtension = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  const readFile1 = readFile(getFullPath(filepath1));
  const readFile2 = readFile(getFullPath(filepath2));

  const extensionFile1 = getExtension(filepath1);
  const extensionFile2 = getExtension(filepath2);

  const parsedFile1 = parseFile(readFile1, extensionFile1);
  const parsedFile2 = parseFile(readFile2, extensionFile2);

  const filesDiff = getDiff(parsedFile1, parsedFile2);
  const formatDiff = stylish(filesDiff);

  return formatDiff;
};

export default genDiff;
