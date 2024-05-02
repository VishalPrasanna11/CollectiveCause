import React from 'react';
import { Box, Button, Grid, Accordion, AccordionSummary, AccordionDetails, AccordionActions, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import UpdateFundRaiserStep1 from '../components/UpdateFundRaiserStep1';
import UpdateFundRaiserStep2 from '../components/UpdateFundRaiserStep2';
import UpdateFundRaiserStep3 from '../components/UpdateFundRaiserStep3';
import FundraiseImage from '../components/Fundraiseimage';
import { updateFormDataByIdAsync } from '../middlewares/fundrasisermiddleware';
import { RootState } from '../store/store';
import { MyEditTheme } from '../themes/theme2';

export default function UpdateFundRaise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.fundRaisingForm);

  const handleUpdate = async () => {
    // Dispatch the async thunk with the form data and id
    dispatch(updateFormDataByIdAsync({ id, formData }))
      .unwrap()
      .then((response) => {
        console.log('Fundraiser updated successfully', response);
        navigate('/mydashboard');
      })
      .catch((error) => {
        console.error('Failed to update fundraiser:', error);
      });
  };

  return (
    <ThemeProvider theme={MyEditTheme}>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FundraiseImage id={id} />
            {/* Additional controls if necessary */}
          </Grid>
          <Grid item xs={12} md={8}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                Basic Details
              </AccordionSummary>
              <AccordionDetails>
                <UpdateFundRaiserStep1 id={id} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                Beneficiary Details
              </AccordionSummary>
              <AccordionDetails>
                <UpdateFundRaiserStep2 id={id} />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
                Submit Update
              </AccordionSummary>
              <AccordionDetails>
                <UpdateFundRaiserStep3 />
              </AccordionDetails>
              <AccordionActions>
                <Button onClick={handleUpdate}>Update</Button>
              </AccordionActions>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
