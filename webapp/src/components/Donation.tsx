import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { MyTheme } from "../themes/theme1";
import { dataURItoBlob } from "../utils/createBlob";
import CircularProgress from "./CircularProgress";

type Data = {
  _id: string;
  image: string;
  description: string;
  fundriser_name: string;
  received_amount: number;
  required_amount: number;
  cause_type: string;
  title: string;
  totalSupporters: number;
};

const Donation = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data | null>(null);
  const fetchData = async () => {
    const res = await fetch(`http://localhost:8002/fundraising/${id}`);
    const data = await res.json();
    setData(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDonate = async () => {
    try {
      const response = await fetch("http://localhost:5252/config");
      const { publishableKey } = await response.json();
     const stripe = await loadStripe(publishableKey);
      if (!stripe) throw new Error("Failed to initialize Stripe");
  
      const result = await fetch("http://localhost:5252/create-payment-intent", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) // Assuming an amount, adjust as necessary
      });
      const { clientSecret } = await result.json();
      if (!clientSecret) throw new Error("Failed to get client secret");
  
      setStripePromise(stripe);
      setClientSecret(clientSecret);
    } catch (error) {
      console.error("Error in handleDonate:", error);
    }
  };
  
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  // Client secret is a string, but initially is an empty string until fetched
  const [clientSecret, setClientSecret] = useState<string>("");

  // Load the publishable key from your server
  // useEffect(() => {
  //   fetch("http://localhost:5252/config").then(async (r) => {
  //     const { publishableKey } = await r.json();
  //     console.log("This is public key",publishableKey)
  //     const stripe = await loadStripe(publishableKey);
  //     setStripePromise(stripe);
  //   });
  // }, []);

  // // Create a Payment Intent and get the client secret
  // useEffect(() => {
  //   fetch("http://localhost:5252/create-payment-intent", {
  //     method: "POST",
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     const { clientSecret } = await result.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  return (
    <ThemeProvider theme={MyTheme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         
        }}
      >
        {data && (
          <Box
            sx={{
              mt: 3,
              width: { lg: "90%", md: "95%", sm: "90%" },
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: {
                lg: "space-between",
                md: "space-between",
                sm: "center",
                xs: "center",
              },
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
            }}
          >
            <Box
              sx={{
                flexGrow: 0.8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // bgcolor:"white",
                
              }}
            >
              
              {data?.image && (
                <img
                  src={URL.createObjectURL(dataURItoBlob(data.image))}
                  width={"60%"}
                  style={{ objectFit: "cover",height:"300px",border:"2px solid black" }}
                ></img>
              )}
               <Typography
                sx={{  fontSize: "24px",border:"2px solid black", width:"60%", }}
              >
                {data.title}
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ minWidth: "60%" }}
                bgcolor={'#D4E7C5'}
              >
                
                <Box display={"flex"} alignItems={"center"}>
                  <CircularProgress
                    value={(data.received_amount * 100) / data.required_amount}
                  />
                  <Box sx={{  fontSize: "20px" }}>
                    <p>Raised</p>
                    <p>
                      {" "}
                      <b>
                        $ {data.received_amount} of $ {data.required_amount}
                      </b>
                    </p>
                  </Box>
                </Box>
                <Box sx={{bg:"#D4E7C5"}}>
                  <Typography
                    sx={{
                      
                      fontSize: "20px",
                      textDecoration: "underline",
                      p: 3,
                      
                    }}
                  >
                    {`${data.totalSupporters} supporters`}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{bg:"#D4E7C5"}}>
              <Typography
                sx={{
                  color: "antiquewhite",
                  fontSize: "20px"
                }}
              >
                {data.description}
              </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: 0.2,
                background: "white",
                display: "flex",
                alignItems: "top",
                flexDirection:"column",
                gap: 2,
                p: 2,
                mt: { sm: 0, xs: 3 },
                mr: { xs: 2 },
                ml: { xs: 2 },
              }}
            >
              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <Button variant="contained" onClick={()=>handleDonate().catch(console.error)}>Donate now</Button>
            </Box>
            {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Donation;
