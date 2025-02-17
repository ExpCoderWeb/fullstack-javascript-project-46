import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return JSON.stringify;
    default:
      throw new Error(`Invalid format - ${formatName}`);
  }
};

export default getFormatter;
