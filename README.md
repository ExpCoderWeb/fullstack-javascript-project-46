### Hexlet tests and linter status:
[![Actions Status](https://github.com/ExpCoderWeb/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ExpCoderWeb/fullstack-javascript-project-46/actions) [![lint-and-test](https://github.com/ExpCoderWeb/fullstack-javascript-project-46/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/ExpCoderWeb/fullstack-javascript-project-46/actions/workflows/test-and-lint.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/0ecdf71fcddffc9d9b3e/maintainability)](https://codeclimate.com/github/ExpCoderWeb/fullstack-javascript-project-46/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/0ecdf71fcddffc9d9b3e/test_coverage)](https://codeclimate.com/github/ExpCoderWeb/fullstack-javascript-project-46/test_coverage)

### Overview

**"Difference Finder"** is a program that determines the difference between two data structures. It displays how the second file has changed compared to the first one. This is a common task for which there are numerous online services, for example, http://www.jsondiff.com/. This mechanism is used when outputting tests or tracking changes in configuration files.

**Utility features**:

- Support for different input formats: JSON, YAML
- Output in stylish (by default), plain text, and JSON format

### Minimal system requirements:
- Unix terminal
- Node.js: version from 18.x

### Utility setup
1. Clone the repo with the following command:
```bash
git clone git@github.com:ExpCoderWeb/fullstack-javascript-project-46.git
```
2. Enter the root directory of the package with the command:
```bash
cd fullstack-javascript-project-46
```
3. Install the necessary dependencies with the command:
```bash
npm ci
```
4. Create a symbolic link to the package in order to make the utility to run from any directory of the system using the command: 
```bash
npm link
```

### Usage
```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           output usage information
```
Program can handle both absolute and relative filepaths. Compared files can be in different formats. Example:
```bash
gendiff /home/user/__fixtures__/file1.json __fixtures__/file2.yml
```

This library can be installed as a dependency in any other NPM package as well. An example of how other packages could use genDiff:
```bash
import genDiff from '@hexlet/code';

const diff = genDiff(filepath1, filepath2, formatName);
console.log(diff);
```

### Demonstration

#### 1. Comparison of flat files:
[![asciicast](https://asciinema.org/a/Tc8nH134MBp8TLBOkwke4eK1Y.svg)](https://asciinema.org/a/Tc8nH134MBp8TLBOkwke4eK1Y)

#### 2. Comparison of nested files (format 'stylish'):
[![asciicast](https://asciinema.org/a/R2vd2AmfaKWZAhdZq5yholDQN.svg)](https://asciinema.org/a/R2vd2AmfaKWZAhdZq5yholDQN)

#### 3. Comparison of nested files (format 'plain'):
[![asciicast](https://asciinema.org/a/xreCxFS8BDQ7EHDaMP9c7WK0S.svg)](https://asciinema.org/a/xreCxFS8BDQ7EHDaMP9c7WK0S)

#### 4. Comparison of nested files (format 'json'):
[![asciicast](https://asciinema.org/a/GAoKHeauTxNIpUXpUUFXb2izu.svg)](https://asciinema.org/a/GAoKHeauTxNIpUXpUUFXb2izu)