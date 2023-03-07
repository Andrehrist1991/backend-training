// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducer
import rootReducer from './root-reducer';

const store = configureStore({
  reducer: rootReducer,
});

module.hot.accept('./root-reducer', () => store.replaceReducer(rootReducer));

export default store;
