// Modules
import get from 'lodash/get';

/**
 * @typedef Styles
 * @type {Object.<string, string>}
 */

/**
 * Creates a function to get classNames from the styles object
 * @param {Styles} styles The styles object
 * @return {cssModuleCXFactory~getClassName} The getClassName function
*/
export function cssModuleCXFactory(styles) {
  /**
   * @param {string} className CSS class name
   * @return {(string|void)} CSS class name with hash
  */
  return function getClassName(className) {
    return get(styles, className);
  }
}

export default cssModuleCXFactory;
