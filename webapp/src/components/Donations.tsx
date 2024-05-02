import { ThemeProvider } from "@mui/material/styles";
import { MyTheme } from "../themes/theme1";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import CircularProgress from "./CircularProgress";
import { useNavigate } from "react-router-dom";
import { dataURItoBlob } from "../utils/createBlob";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: "328px",
  maxWidth: "400px",
  cursor: "pointer",
}));

const ItemCategory = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

type Data = {
  _id: string;
  image: string;
  description: string;
  fundriser_name: string;
  received_amount: number;
  required_amount: number;
  cause_type: string;
  title: string;
};

const Donations = () => {
  const [fundraisingData, setFundraisingData] = useState<Data[]>([]);
  const [category, setCategory] = useState(null);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const navigate = useNavigate();
  const categories = ["Education", "Medical", "Disaster","Others"];
  const fetchData = async () => {
    const res = await fetch("http://localhost:8002/fundraising/");
    const data = await res.json();
    setFundraisingData(data);
    
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!category) {
      setFilteredData(fundraisingData);
    } else {
      setFilteredData(fundraisingData.filter((d) => d.cause_type === category));
    }
  }, [category, fundraisingData]);

  const handleCategory = (cat) => {
    if (!category) {
      setCategory(cat);
    } else {
      if (category === cat) {
        setCategory(null);
      } else {
        setCategory(cat);
      }
    }
  };

  const handleClick = (_id) => {
    navigate(`/donate/${_id}`);
  };

  return (
    <ThemeProvider theme={MyTheme}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {fundraisingData.length > 0 && (
          <Box
            sx={{
              mt: 3,
              width: { lg: "80%", md: "80%", sm: "80%" },
              mb: 3,
            }}
          >
            <Box
              sx={{
                borderBottom: "2px solid antiquewhite",
                mb: 2,
                borderRight: "2px solid antiquewhite",
                borderRadius: "20px",
                ml: { xs: 3 },
                mr: { xs: 3 },
                pr: { xs: 1 },
                bgcolor:"white",
              }}
            >
              <Typography sx={{ color: "antiquewhite", fontSize: "24px" }}>
                Categories
              </Typography>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "space-around",
                }}
              >
                {categories.map((category) => (
                  <Box key={category}>
                    <ItemCategory onClick={() => handleCategory(category)}>
                      <p>{category}</p>
                    </ItemCategory>
                  </Box>
                ))}
              </Box>
            </Box>
            <Grid container spacing={2}>
              {filteredData.map((data) => (
                <Grid
                  key={data._id}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  sx={{
                    display: { sm: "flex", xs: "flex" },
                    flexDirection: { sm: "column", xs: "column" },
                    alignItems: { sm: "center", xs: "center" },
                  }}
                >
                  <Item onClick={() => handleClick(data._id)}>
                    {data.image && (
                      <img
                        src={URL.createObjectURL(dataURItoBlob(data.image))}
                        width={"100%"}
                        height={"235px"}
                        style={{ objectFit: "cover" }}
                      ></img>
                    )}
                    <Typography>{data.title}</Typography>
                    <Box display={"flex"} alignItems={"center"} sx={{ p: 2 }}>
                      <Box flexGrow={0.5}>
                        <Box display={"flex"} alignItems={"center"}>
                          <CircularProgress
                            value={
                              (data.received_amount * 100) /
                              data.required_amount
                            }
                          />
                          <Box>
                            <p>Raised</p>
                            <p>
                              {" "}
                              <b>$ {data.received_amount}</b>
                            </p>
                          </Box>
                        </Box>
                      </Box>
                      <Box flexGrow={0.5} alignItems={"center"}>
                        <p>Created By:</p>
                        <p>{data.fundriser_name}</p>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        background: "hsla(0,0%,71%,.1)",
                        padding: "5px 8px 3px",
                        borderLeft: "3px solid #691a47",
                        borderRadius: "2px",
                        mb: 2,
                      }}
                    >
                      <p>Receive tax benefits by donating to this cause</p>
                    </Box>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Donations;
