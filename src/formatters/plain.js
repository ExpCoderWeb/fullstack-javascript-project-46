const transformValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const getPath = (keyPath) => {
  const [oldPath, addedKey] = keyPath;
  const newPath = !oldPath ? [addedKey] : keyPath;

  return newPath.join('.');
};

const plain = (properties) => {
  const iter = (data, path = '') => {
    const result = data
      .flatMap((property) => {
        const newPath = getPath([path, property.key]);
        switch (property.type) {
          case 'added':
            return `Property '${newPath}' was added with value: ${transformValue(property.value)}`;
          case 'deleted':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${transformValue(property.oldValue)} to ${transformValue(property.newValue)}`;
          case 'nested':
            return iter(property.children, newPath);
          default:
            return [];
        }
      });

    return result.join('\n');
  };

  return iter(properties);
};

export default plain;
