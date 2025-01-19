import _ from 'lodash';

const getDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const properties = sortedKeys
    .map((sortedKey) => {
      if (!Object.hasOwn(data1, sortedKey)) {
        return { key: sortedKey, value: data2[sortedKey], type: 'added' };
      }

      if (!Object.hasOwn(data2, sortedKey)) {
        return { key: sortedKey, value: data1[sortedKey], type: 'deleted' };
      }

      if (data1[sortedKey] !== data2[sortedKey]) {
        if (_.isPlainObject(data1[sortedKey]) && _.isPlainObject(data2[sortedKey])) {
          return {
            key: sortedKey,
            value: 'object',
            type: 'nested',
            children: getDiff(data1[sortedKey], data2[sortedKey]),
          };
        }

        return {
          key: sortedKey,
          oldValue: data1[sortedKey],
          newValue: data2[sortedKey],
          type: 'changed',
        };
      }

      return { key: sortedKey, value: data1[sortedKey], type: 'unchanged' };
    });

  return properties;
};

export default getDiff;
