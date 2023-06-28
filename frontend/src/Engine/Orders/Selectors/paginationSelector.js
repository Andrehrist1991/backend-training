// Modules
import { createSelector } from '@reduxjs/toolkit';

// Engine
import selfSelector from './self';

const paginationSelector = createSelector(
  selfSelector,
  (self) => self.pagination
);

export default paginationSelector;
