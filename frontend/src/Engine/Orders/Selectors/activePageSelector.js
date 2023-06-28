// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const activePageSelector = createSelector(
  selfSelector,
  (self) => self.activePage
);

export default activePageSelector;
