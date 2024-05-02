import React, { useEffect } from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { getFormDataByIdAsync } from "../middlewares/fundrasisermiddleware";
import { useAppDispatch } from "../reducers/fundrasierslice";
import Image from '../assets/logo01.png';
import { dataURItoBlob } from "../utils/createBlob";
function FundraiseImage({ id }) {
    const fundraiser = useSelector((state: RootState) => state.fundRaisingForm);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
        if (id) {
            dispatch(getFormDataByIdAsync(id));
        }
    }, [dispatch, id]);
// console.log(fundraiser.image)
    // Optional: Convert base64 string to image URL if not already formatted
    const imageSrc = fundraiser.image ? `data:image/png;base64,${fundraiser.image}` : '/default-image.jpg';
    console.log(imageSrc)
    return (
        <Card sx={{ mb: 2 }}>
            {/* <CardMedia
                component="img"
                height="140"
                image={imageSrc}
                alt="Collective Cause"
            /> */}
                {fundraiser.image && (
                      <img
                        src={URL.createObjectURL(dataURItoBlob(fundraiser.image))}
                        width={"100%"}
                        height={"235px"}
                        style={{ objectFit: "cover" }}
                      ></img>
                    )}
            
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
                    {fundraiser.title || 'Collective Cause'} 
                </Typography>
                
            </CardContent>
        </Card>
    );
}

export default FundraiseImage;
