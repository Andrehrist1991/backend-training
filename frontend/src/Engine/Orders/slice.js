// Modules
import { createSlice } from '@reduxjs/toolkit';
import assign from 'lodash/assign';
import set from 'lodash/set';

// // Engine
import asyncActions from './async-actions';

const { getAllOrders } = asyncActions;

const initialState = {
  orders: {
    data: {},
    error: false,
    pending: false,
  },
};


export const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrder(state, { payload }) {
      set(state, 'orders', payload);
    },
  },
  extraReducers(builder) {

    /* Get all orders */
    builder
      .addCase(getAllOrders.pending, (state) => {
        assign(state.orders, { pending: true });
      })
      .addCase(getAllOrders.rejected, (state) => {
        assign(state.orders, { error: true, pending: false });
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        assign(state.orders, {
          data: payload,
          pending: false,
        });
      });
  },
});

export default slice;
