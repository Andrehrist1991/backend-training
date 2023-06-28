// Modules
import { createAsyncThunk } from '@reduxjs/toolkit';

import API from 'API';

export const getAllOrders = createAsyncThunk(
  'orders/get-all-orders',
  async ({ skip, take }) => API.Products.getAllProducts({ skip, take })
);

export const addNewOrder = createAsyncThunk(
  'orders/add-new-order',
  async (data) => API.Products.addNewProduct(data)
);

export const updateOrder = createAsyncThunk(
  'orders/update-order',
  async ({ id, data }) => API.Products.updateProduct(id, data)
);

export const deleteOrder = createAsyncThunk(
  'orders/delete-order',
  async (id) => API.Products.deleteProduct(id)
);

const asyncActions = {
  addNewOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
};

export default asyncActions;
