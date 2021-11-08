import dataTypes from './dataTypes';

export default {
  // SUBSTITUTE(Text T ; Text Old ; Text New [; Number Which ])
  substitute: {
    _func: args => {
      const src = args[0].toString();
      const old = args[1].toString();
      const replacement = args[2].toString();
      // no third parameter? replace all instances
      if (args.length <= 3) return src.replace(new RegExp(old, 'g'), replacement);
      const whch = args[3].valueOf();
      // find the instance to replace
      let pos = -1;
      for (let i = 0; i < whch; i += 1) {
        pos += 1;
        const nextFind = src.slice(pos).indexOf(old);
        // no instance to match 'Which'
        if (nextFind === -1) return src;
        pos += nextFind;
      }
      const result = src.slice(0, pos) + src.slice(pos).replace(old, replacement);
      return result;
    },
    _signature: [
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_STRING] },
      { types: [dataTypes.TYPE_STRING], variadic: true },
    ],
  },
};
