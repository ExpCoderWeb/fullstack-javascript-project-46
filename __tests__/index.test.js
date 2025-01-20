import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

const mainJson1 = getFixturePath('file1.json');
const mainJson2 = getFixturePath('file2.json');
const emptyJson1 = getFixturePath('empty-file1.json');
const emptyJson2 = getFixturePath('empty-file2.json');

const mainYaml1 = getFixturePath('file1.yaml');
const mainYaml2 = getFixturePath('file2.yaml');
const emptyYaml1 = getFixturePath('empty-file1.yaml');
const emptyYaml2 = getFixturePath('empty-file2.yaml');

const mainYml = getFixturePath('file.yml');

const expectedStylish = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
const expectedStylishWithArrayHandling = fs.readFileSync(getFixturePath('result-stylish-arr.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
const expectedJson = fs.readFileSync(getFixturePath('result-json.txt'), 'utf-8');
const expectedEmpty = fs.readFileSync(getFixturePath('result-empty.txt'), 'utf-8');

describe('nested files', () => {
  test('stylish', () => {
    expect(genDiff(mainJson1, mainJson2, 'stylish')).toEqual(expectedStylishWithArrayHandling);
  });

  test('plain', () => {
    expect(genDiff(mainYaml1, mainYaml2, 'plain')).toEqual(expectedPlain);
  });

  test('json', () => {
    expect(genDiff(mainYaml1, mainYml, 'json')).toEqual(expectedJson);
  });

  test('unstated format', () => {
    expect(genDiff(mainYaml1, mainYaml2)).toEqual(expectedStylish);
  });

  test('unexisting format', () => {
    expect(genDiff(mainYaml1, mainYaml2, 'smth different')).toEqual(expectedStylish);
  });
});

describe('empty files', () => {
  test('json', () => {
    expect(genDiff(emptyJson1, emptyJson2)).toEqual(expectedEmpty);
  });

  test('yaml', () => {
    expect(genDiff(emptyYaml1, emptyYaml2)).toEqual(expectedEmpty);
  });
});

describe('parsers', () => {
  test('parse invalid file extension', () => {
    expect(() => parseFile({ key: 'value' }, '.txt')).toThrow();
  });
});

describe('formatters when dealing with unsupported types', () => {
  test('stylish', () => {
    expect(() => stylish([
      { key: 'value', type: 'added' },
      { key: 'value', type: 'complex' },
    ])).toThrow();
  });

  test('plain', () => {
    expect(() => plain([
      { key: 'value', type: 'unchanged' },
      { key: 'value', type: 'complex' },
    ])).toThrow();
  });
});
