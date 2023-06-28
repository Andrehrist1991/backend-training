// Modules
import { createSlice } from '@reduxjs/toolkit';
import assign from 'lodash/assign';
import findIndex from 'lodash/findIndex';
import head from 'lodash/head';
import map from 'lodash/map';
import set from 'lodash/set';

// Constants
import { ITEMS_PER_PAGE } from '../Orders/Constants/constants';

// Engine
import asyncActions from './async-actions';

// Models
import Order from 'Models/Order';

const {
  addNewOrder,
  deleteOrder,
  getAllOrders,
  updateOrder
} = asyncActions;

const initialState = {
  activePage: 0,
  activeEditOrder: {},
  orders: {
    data: [],
    error: false,
    pending: false,
  },
  pagination: {
    skip: 0,
    take: head(ITEMS_PER_PAGE),
  },
  totalProductsCount: 0,
  updateOrder: {
    data: {},
    error: false,
    pending: false,
  },
};


export const slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setActiveEditOrder(state, { payload }) {
      set(state, 'activeEditOrder', payload);
    },
    setActivePage(state, { payload }) {
      set(state, 'activePage', payload);
    },
    setOrder(state, { payload }) {
      set(state, 'orders', payload);
    },
    setPagination(state, { payload }) {
      assign(state.pagination, payload);
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
      .addCase(getAllOrders.fulfilled, (state, {payload: { data }}) => {
        assign(state.orders, {
          data: map(data.products, (order) => new Order(order)),
          pending: false,
        });

        state.totalProductsCount = data?.totalCount;
      });

    /* Add new order */
    builder
      .addCase(addNewOrder.pending, (state) => {
        assign(state.orders, { pending: true });
      })
      .addCase(addNewOrder.rejected, (state) => {
        assign(state.orders, { error: true, pending: false });
      })
      .addCase(addNewOrder.fulfilled, (state, { payload }) => {
        state.orders.data.push(payload);
      });

    /* UpdateOrder order */
    builder
      .addCase(updateOrder.pending, (state) => {
        assign(state.updateOrder, { pending: true });
      })
      .addCase(updateOrder.rejected, (state) => {
        assign(state.updateOrder, { error: true, pending: false });
      })
      .addCase(updateOrder.fulfilled, (state, { meta: { arg: payload } } ) => {
        const idx = findIndex(state.orders.data, {
          id: payload.id,
        });

        if (idx > -1) {
          state.orders.data[idx] = new Order(Object.assign({}, state.orders.data[idx], payload.data));
        }
      });

    /* Delete order */
    builder
      .addCase(deleteOrder.pending, (state) => {
        assign(state.orders, { pending: true });
      })
      .addCase(deleteOrder.rejected, (state) => {
        assign(state.orders, { error: true, pending: false });
      });

  },
});

export default slice;
