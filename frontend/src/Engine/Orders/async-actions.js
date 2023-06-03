// Modules
import { createAsyncThunk } from '@reduxjs/toolkit';

import API from 'API';

export const getAllOrders = createAsyncThunk(
  'orders/get-all-orders',
  async () => API.Products.getAllProducts()
);

const asyncActions = {
  getAllOrders,
};

export default asyncActions;
