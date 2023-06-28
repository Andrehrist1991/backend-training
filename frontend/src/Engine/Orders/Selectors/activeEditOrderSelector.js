// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const activeEditOrderSelector = createSelector(
  selfSelector,
  (self) => self.activeEditOrder
);

export default activeEditOrderSelector;
