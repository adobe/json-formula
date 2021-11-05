import { dataTypes } from '../json-formula';

export default {
  upperFirst: {
    _func: args => {
      const str = args[0].toString();
      return str.slice(0, 1).toUpperCase() + str.slice(1);
    },
    _signature: [{ types: [dataTypes.TYPE_STRING] }],
  },
};
