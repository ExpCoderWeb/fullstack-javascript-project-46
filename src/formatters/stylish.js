const stylish = (tree) => {
  const replacer = ' ';
  const spacesCount = 2;

  const indentSize = spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const closingBracketIndent = replacer.repeat(indentSize - spacesCount);

  const properties = tree
    .map((property) => {
      switch (property.type) {
        case 'added':
          return `${currentIndent}+ ${property.key}: ${property.value}`;
        case 'deleted':
          return `${currentIndent}- ${property.key}: ${property.value}`;
        case 'changed':
          return `${currentIndent}- ${property.key}: ${property.oldValue}\n${currentIndent}+ ${property.key}: ${property.newValue}`;
        default:
          return `${currentIndent}  ${property.key}: ${property.value}`;
      }
    });

  return [
    '{',
    ...properties,
    `${closingBracketIndent}}`,
  ].join('\n');
};

export default stylish;
