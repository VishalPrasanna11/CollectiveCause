import { createAsyncThunk } from "@reduxjs/toolkit";
import FundRaisingForm from "../interfaces/fundrasisnginterface";

interface UpdateFormPayload {
  id: string;
  formData: FundRaisingForm;
}

const baseURL = "http://localhost:8002/fundraising/";

export const submitFormDataAsync = createAsyncThunk(
  'fundRaisingForm/submitFormDataAsync',
  
  async (formData: FundRaisingForm, { rejectWithValue }) => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();

      return data; // Return any data you want to pass along with the action
    } catch (error) {
      console.error('Form submission failed:', error);
      return rejectWithValue(error.message); // Handle error with rejection value
    }
  }
);

export const getFormDataByIdAsync = createAsyncThunk(
  'fundRaisingForm/getFormDataById',
  
  async (id: string, { rejectWithValue }) => {
  
    try {
      const url = baseURL+id;
      console.log(url)
          const response = await fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (!response.ok) {
              throw new Error('Failed to retrieve data');
          }

          const data = await response.json();
          return data;  // Return the retrieved data
      } catch (error) {
          console.error('Data retrieval failed:', error);
          return rejectWithValue(error.message); // Handle error with rejection value
      }
  }
);

export const updateFormDataByIdAsync = createAsyncThunk(
  'fundRaisingForm/updateFormDataById',
  async ({ id, formData }: UpdateFormPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8002/fundraising/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update form data');
      }

      return await response.json();
    } catch (error) {
      console.error('Update operation failed:', error);
      return rejectWithValue(error.message);
    }
  }
);
