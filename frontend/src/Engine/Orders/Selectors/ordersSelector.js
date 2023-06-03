// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const ordersSelector = createSelector(
  selfSelector,
  (self) => self.orders
);

export default ordersSelector;
