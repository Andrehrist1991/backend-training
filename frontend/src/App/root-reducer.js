// Engine
import ordersReducer from 'Engine/Orders';

/**
 * Global Store
 * @typedef {Object} RootReducer
*/

/**
 * @constant
 * @type {RootReducer}
*/

const rootReducer = {
  orders: ordersReducer,
};

export default rootReducer;
