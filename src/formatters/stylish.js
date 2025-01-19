import _ from 'lodash';

const getCurrentAndBracketIndents = (depth, replacer = ' ', spacesCount = 4) => {
  const currentIndent = replacer.repeat(depth * spacesCount - 2);
  const closingBracketIndent = replacer.repeat(depth * spacesCount - spacesCount);

  return [currentIndent, closingBracketIndent];
};

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) {
    return `${node}`;
  }

  const [currentIndent, closingBracketIndent] = getCurrentAndBracketIndents(depth + 1);

  const properties = Object
    .entries(node)
    .map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  return [
    '{',
    ...properties,
    `${closingBracketIndent}}`,
  ].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const [currentIndent, closingBracketIndent] = getCurrentAndBracketIndents(depth);

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
            return `${currentIndent}+ ${key}: ${stringify(value, depth)}`;
          case 'deleted':
            return `${currentIndent}- ${key}: ${stringify(value, depth)}`;
          case 'changed':
            return `${currentIndent}- ${key}: ${stringify(oldValue, depth)}\n${currentIndent}+ ${key}: ${stringify(newValue, depth)}`;
          case 'unchanged':
            return `${currentIndent}  ${key}: ${stringify(value, depth)}`;
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
  };

  return iter(tree);
};

export default stylish;
