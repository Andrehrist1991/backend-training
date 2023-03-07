// Modules
import { createSlice } from '@reduxjs/toolkit';
import set from 'lodash/set';

// // Engine
import asyncActions from './async-actions';

const {} = asyncActions;

const initialState = {
  orders: {},
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

    /* */
    // builder
    //   .addCase(getUserProjects.pending, (state) => {
    //     assign(state.userProjects, { pending: true });
    //   })
    //   .addCase(getUserProjects.rejected, (state) => {
    //     assign(state.userProjects, { error: true, pending: false });
    //   })
    //   .addCase(getUserProjects.fulfilled, (state, { payload }) => {
    //     assign(state.userProjects, {
    //       data: payload,
    //       error: false,
    //       pending: false,
    //     });
    //   });
  },
});

export default slice;
