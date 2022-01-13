export default function stringToNumber(n) {
  const ret = +(n.replace(/\$/, ''));
  return Number.isNaN(ret) ? 0 : ret;
}
