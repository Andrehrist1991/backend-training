// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const totalCountSelector = createSelector(
  selfSelector,
  (self) => self.totalProductsCount
);

export default totalCountSelector;
