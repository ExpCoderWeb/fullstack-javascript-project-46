import _ from 'lodash';

// Для интереса и челленджа решил попробовать сделать также обработку массивов,
// когда они являются значением ключа. Почти получилось, остаётся подшаманить
// правильные отсупы у объектов, вложенных в массив.
const replacer = ' ';
const spacesCount = 4;
const spacesCountForArray = 3;
const indentShiftForArray = 2;

const getCurrentAndBracketIndents = (depth) => {
  const currentIndent = replacer.repeat(depth * spacesCount - 2);
  const closingBracketIndent = replacer.repeat(depth * spacesCount - spacesCount);

  return [currentIndent, closingBracketIndent];
};

const getCurrentAndBracketIndentsArr = (depth) => {
  const currentIndent = replacer.repeat(depth * spacesCountForArray - indentShiftForArray);
  const closingBracketIndent = replacer.repeat(depth * spacesCountForArray - spacesCountForArray);

  return [currentIndent, closingBracketIndent];
};

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }

  const [currentIndent, closingBracketIndent] = getCurrentAndBracketIndents(depth + 1);
  const extraIndent = '  ';

  const properties = Object
    .entries(node)
    .map(([key, value]) => `${currentIndent}${extraIndent}${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...properties,
    `${closingBracketIndent}}`,
  ].join('\n');
};

const stringifyArr = (node, depth) => {
  const [currentIndent, closingBracketIndent] = getCurrentAndBracketIndentsArr(depth + 1);

  if (!_.isObject(node)) {
    return `${currentIndent}${node}`;
  }

  if (Array.isArray(node)) {
    if (node.length === 0) {
      return `${currentIndent}[]`;
    }

    const items = node
      .map((item) => stringifyArr(item, depth + 1));

    const lines = items.join(',\n');
    return `${currentIndent}[\n${lines}\n ${closingBracketIndent}]`;
  }

  const properties = Object
    .entries(node)
    .map(([key, value]) => `${currentIndent}${key}: ${stringify(value, depth + 1)}`);

  if (properties.length === 0) {
    return `${currentIndent}{}`;
  }

  return [
    `${currentIndent}{`,
    ...properties,
    `${currentIndent}}`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const [currentIndent, closingBracketIndent] = getCurrentAndBracketIndents(depth);

    if (Array.isArray(node) && !node[0]?.type) {
      if (node.length === 0) {
        return '[]';
      }

      const items = node
        .map((item) => stringifyArr(item, depth + 1));

      const lines = items.join(',\n');
      return `[\n${lines}\n${replacer.repeat(spacesCount)}${closingBracketIndent}]`;
    }

    if (Array.isArray(node)) {
      const properties = node
        .map(({
          type,
          key,
          value,
          oldValue,
          newValue,
          children,
        }) => {
          switch (type) {
            case 'added':
              return `${currentIndent}+ ${key}: ${iter(value, depth)}`;
            case 'deleted':
              return `${currentIndent}- ${key}: ${iter(value, depth)}`;
            case 'changed':
              return `${currentIndent}- ${key}: ${iter(oldValue, depth)}\n${currentIndent}+ ${key}: ${iter(newValue, depth)}`;
            case 'unchanged':
              return `${currentIndent}  ${key}: ${iter(value, depth)}`;
            case 'nested':
              return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
            default:
              throw new Error(`Such type - ${type} doesn't exist`);
          }
        });

      return [
        '{',
        ...properties,
        `${closingBracketIndent}}`,
      ].join('\n');
    }

    return stringify(node, depth);
  };

  return iter(tree);
};

export default stylish;
