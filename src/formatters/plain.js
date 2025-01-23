import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const getPath = (keyPath) => {
  const [oldPath, addedKey] = keyPath;
  const newPath = !oldPath ? [addedKey] : keyPath;

  return newPath.join('.');
};

const plain = (tree) => {
  const iter = (node, path = '') => {
    if (node.length === 0) {
      return 'Both files are empty';
    }

    const properties = node
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        type,
        key,
        value,
        oldValue,
        newValue,
        children,
      }) => {
        const newPath = getPath([path, key]);
        switch (type) {
          case 'added':
            return `Property '${newPath}' was added with value: ${stringify(value)}`;
          case 'deleted':
            return `Property '${newPath}' was removed`;
          case 'changed':
            return `Property '${newPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
          case 'nested':
            return iter(children, newPath);
          default:
            throw new Error(`Such type - ${type} doesn't exist`);
        }
      });

    return properties.join('\n');
  };

  return iter(tree);
};

export default plain;
