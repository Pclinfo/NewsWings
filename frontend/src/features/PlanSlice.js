import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPlan: null,
  isPaid: false,
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    markPaid: (state) => {
      state.isPaid = true;
    },
  },
});

export const { selectPlan, markPaid } = plansSlice.actions;
export default plansSlice.reducer;
