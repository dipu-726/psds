/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */

const myNew = (constructor, ...args) => {
  const newInstance = {};
  // official way
  Object.setPrototypeOf(newInstance, constructor.prototype);
  const result = constructor.apply(newInstance, args);
  return result || newInstance;
}