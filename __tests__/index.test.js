import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const mainJson1 = getFixturePath('file1.json');
const mainJson2 = getFixturePath('file2.json');
const emptyJson1 = getFixturePath('empty-file1.json');
const emptyJson2 = getFixturePath('empty-file2.json');

let expectedMainJson;
let expectedEmptyJson;

beforeAll(() => {
  expectedMainJson = fs.readFileSync(getFixturePath('result-main.txt'), 'utf-8');
  expectedEmptyJson = fs.readFileSync(getFixturePath('result-empty.txt'), 'utf-8');
});

describe('json', () => {
  test('genDiff main case', () => {
    expect(genDiff(mainJson1, mainJson2)).toEqual(expectedMainJson);
  });

  test('genDiff empty files', () => {
    expect(genDiff(emptyJson1, emptyJson2)).toEqual(expectedEmptyJson);
  });
});
