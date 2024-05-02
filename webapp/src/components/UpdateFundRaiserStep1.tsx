import React, { useEffect } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { updateField } from "../reducers/fundrasierslice"; // Import your update action creator
import { getFormDataByIdAsync } from "../middlewares/fundrasisermiddleware";

function UpdateFundRaiserStep1({ id }) {
  const fundraiser = useSelector((state: RootState) => state.fundRaisingForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormDataByIdAsync(id));
  }, [dispatch, id]);

  const handleInputChange = (field) => (event) => {
    dispatch(updateField({ field, value: event.target.value }));
  };

  const handleCauseTypeChange = (event) => {
    dispatch(updateField({ field: 'cause_type', value: event.target.value }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Cause Type</Typography>
        <FormControl fullWidth>
          <InputLabel id="cause-type-label">Cause Type</InputLabel>
          <Select
            labelId="cause-type-label"
            id="cause-type-select"
            value={fundraiser.cause_type || ''}
            onChange={handleCauseTypeChange}
            label="Cause Type"
            variant="outlined"
          >
            <MenuItem value="Medical">Medical</MenuItem>
            <MenuItem value="Disaster">Disaster</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Full Name</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="Full Name"
          value={fundraiser.fundriser_name || ''}
          onChange={handleInputChange('fundriser_name')}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Email</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="email"
          value={fundraiser.fundriser_email || ''}
          onChange={handleInputChange('fundriser_email')}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Phone Number</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="phone"
          value={fundraiser.fundriser_phoneNumber || ''}
          onChange={handleInputChange('fundriser_phoneNumber')}
        />
      </Box>
    </Box>
  );
}

export default UpdateFundRaiserStep1;
