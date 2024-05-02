import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { submitFormDataAsync } from '../middlewares/fundrasisermiddleware';
import { getFormDataByIdAsync } from '../middlewares/fundrasisermiddleware';
import FundRaisingForm from '../interfaces/fundrasisnginterface';
import { updateFormDataByIdAsync } from '../middlewares/fundrasisermiddleware';

const initialState: FundRaisingForm = {
  cause_type: "Medical",
  fundriser_name: "",
  fundriser_email: "",
  fundriser_phoneNumber: 9900000000,
  beneficiary_type: "Individual",
  beneficiary_name: "",
  description: "",
  beneficiary_location: "",
  title: "",
  end_date: "",
  required_amount: 0,
  supports: [],
};


const fundRaisingFormSlice = createSlice({
  name: 'fundRaisingForm',
  initialState,
  reducers: {
    updateField(
      state,
      action: PayloadAction<{ field: keyof FundRaisingForm; value: string | number | Date | undefined }>
    ) {
      const { field, value } = action.payload;
      if (value !== undefined) {
        (state as any)[field] = value as FundRaisingForm[keyof FundRaisingForm];
      }
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitFormDataAsync.fulfilled, (state, action) => {
      // Handle fulfilled state (after successful form submission) if needed
      // console.log('Form submission successful:', action.payload),state;
      // You can update state or perform other actions based on the response
    });
    builder.addCase(submitFormDataAsync.rejected, (state, action) => {
      // Handle rejected state (if form submission fails) if needed
      // console.error('Form submission failed:', action.error.message);
      // You can update state or perform other actions based on the error
    });
    builder.addCase(getFormDataByIdAsync.fulfilled, (state, action) => {
      // Update state with the fetched data
      return action.payload; // or use Object.assign(state, action.payload) if you need to retain some parts of the old state
  });
  builder.addCase(updateFormDataByIdAsync.fulfilled, (state, action) => {
    // Replace or merge the state with the updated data
    Object.assign(state, action.payload);
  });
  builder.addCase(updateFormDataByIdAsync.rejected, (state, action) => {
    console.error('Update failed:', action.error.message);
    // Optionally manage the state on failure to update
  });
  },
  
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const { updateField, resetForm } = fundRaisingFormSlice.actions;

export default fundRaisingFormSlice.reducer;
