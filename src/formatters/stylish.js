import _ from 'lodash';

const stylish = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize - 2);
    const closingBracketIndent = replacer.repeat(indentSize - spacesCount);

    if (Array.isArray(currentValue)) {
      const properties = currentValue
        .map((property) => {
          switch (property.type) {
            case 'added':
              return `${currentIndent}+ ${property.key}: ${iter(property.value, depth + 1)}`;
            case 'deleted':
              return `${currentIndent}- ${property.key}: ${iter(property.value, depth + 1)}`;
            case 'changed':
              return `${currentIndent}- ${property.key}: ${iter(property.oldValue, depth + 1)}\n${currentIndent}+ ${property.key}: ${iter(property.newValue, depth + 1)}`;
            case 'unchanged':
              return `${currentIndent}  ${property.key}: ${iter(property.value, depth + 1)}`;
            default:
              return `${currentIndent}  ${property.key}: ${iter(property.children, depth + 1)}`;
          }
        });

      return [
        '{',
        ...properties,
        `${closingBracketIndent}}`,
      ].join('\n');
    }

    const props = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}  ${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...props,
      `${closingBracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export default stylish;
