import * as FundService from '../services/fund-services.js';

const addFund = async (req, res) => {
  // console.log(req.body); // Log the request body for debugging purposes

  try {
    // Attempt to add the fund using FundService
    const result = await FundService.addFund(req.body);
    console.log("Result from Controller: ", result);

    // If adding the fund is successful, respond with a 201 status and the result
    res.status(201).json(result);
  } catch (error) {
    // If an error occurs during fund addition, catch it here
    console.error("Error in addFund controller:", error);

    // Respond with a 500 status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllFunds = async (req, res) => {
  try {
    const funds = await FundService.getAllFunds();
    res.status(200).json(funds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getByID = async (req, res) => {
  const  id = req.params.id; // Extract the fund ID from request parameters
  try {
    const fund = await FundService.getFundById(id); // Call the service function with the fund ID
    if (!fund) {
      // If fund is not found, return a 404 Not Found response
      return res.status(404).json({ message: 'Fund not found' });
    }
    // If fund is found, return a 200 OK response with the fund data
    res.status(200).json(fund);
  } catch (error) {
    // If an error occurs during the operation, return a 500 Internal Server Error response
    res.status(500).json({ message: error.message });
  }
};

const updateFund = async (req, res) => {
  try {
    const result = await FundService.updateFund(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFund = async (req, res) => {
  try {
    await FundService.deleteFund(req.params.id);
    res.status(200).json({ message: "Delete SuccessFull" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getFundsByCauseType = async (req, res) => {
  const { causeType } = req.params;
  try {
    const funds = await FundService.getFundsByCauseType(causeType);
    res.status(200).json(funds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSupporterToFund = async (req, res) => {
   const fundId  = req.params.id;
 
  const  supporterData  = req.body;
  try {
    const fund = await FundService.addSupporterToFund(fundId, supporterData);
    res.status(200).json(fund);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addFund,
  getAllFunds,
  updateFund,
  deleteFund,
  getFundsByCauseType,
  addSupporterToFund,
  getByID
};