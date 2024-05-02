import React from 'react';
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../store/store";
import { updateField } from "../reducers/fundrasierslice";
import dayjs from 'dayjs';

function UpdateFundRaiserStep3() {
    const { required_amount, end_date, title, image } = useSelector((state: RootState) => state.fundRaisingForm);
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleInputChange = (field) => (event) => {
        dispatch(updateField({ field, value: event.target.value }));
    };

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result?.toString() ?? '';
                dispatch(updateField({ field: 'image', value: base64String }));
                setSnackbarOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDateForInput = (dateStr) => {
        return dayjs(dateStr).format('YYYY-MM-DD');
    };

    return (
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Required Amount</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="requiredAmount"
                    value={required_amount || ''}
                    onChange={handleInputChange('required_amount')}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>End Date</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    type="date"
                    name="endDate"
                    value={formatDateForInput(end_date)}
                    onChange={handleInputChange('end_date')}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Title</Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={title || ''}
                    onChange={handleInputChange('title')}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ width: '30%' }}>Update the Image</Typography>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleImageUpload}
                    />
                </Button>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message="Image uploaded successfully!"
            />
        </Box>
    );
}

export default UpdateFundRaiserStep3;
