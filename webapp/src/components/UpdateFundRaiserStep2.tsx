import React, { useEffect } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { updateField } from "../reducers/fundrasierslice";
import { getFormDataByIdAsync } from "../middlewares/fundrasisermiddleware";

function UpdateFundRaiserStep2({ id }) {
  const fundraiser = useSelector((state: RootState) => state.fundRaisingForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFormDataByIdAsync(id));
  }, [dispatch, id]);

  const handleInputChange = (field) => (event) => {
    dispatch(updateField({ field, value: event.target.value }));
  };

  const handleBeneficiaryTypeChange = (event) => {
    dispatch(updateField({ field: 'beneficiary_type', value: event.target.value }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
 
       <Typography sx={{ width: '30%' }}>Cause Type</Typography>
      <FormControl fullWidth>
        <InputLabel id="beneficiary-type-label">Beneficiary Type</InputLabel>
        <Select
          labelId="beneficiary-type-label"
          id="beneficiary-type-select"
          value={fundraiser.beneficiary_type || ''}
          onChange={handleBeneficiaryTypeChange}
          label="Beneficiary Type"
          variant="outlined"
        >
          <MenuItem value="Individual">Individual</MenuItem>
          <MenuItem value="Group">Group</MenuItem>
          <MenuItem value="Friend">Friend</MenuItem>
          <MenuItem value="NGO">NGO</MenuItem>
        </Select>
      </FormControl>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Beneficiary Name</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="beneficiaryName"
          value={fundraiser.beneficiary_name || ''}
          onChange={handleInputChange('beneficiary_name')}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Beneficiary Location</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="beneficiaryLocation"
          value={fundraiser.beneficiary_location || ''}
          onChange={handleInputChange('beneficiary_location')}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography sx={{ width: '30%' }}>Description</Typography>
        <TextField
          variant="outlined"
          fullWidth
          name="description"
          value={fundraiser.description || ''}
          onChange={handleInputChange('description')}
        />
      </Box>
    </Box>
  );
}

export default UpdateFundRaiserStep2;
