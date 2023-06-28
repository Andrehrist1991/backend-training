// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducer
import rootReducer from './root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

module.hot.accept('./root-reducer', () => store.replaceReducer(rootReducer));

export default store;
