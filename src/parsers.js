const parseFile = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return;
    case '.yaml':
      return;
  }
};

export default parseFile;
