import Fund from '../models/fund-model.js';

export const addFund = async (data) => {
  const fund = new Fund(data);
  return await fund.save();
};

export const getAllFunds = async () => {
  return await Fund.find();
};

export const getFundById = async (id) => {
  return await Fund.findById(id);
};

export const updateFund = async (id, data) => {
  return await Fund.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFund = async (id) => {
  await Fund.findByIdAndDelete(id);
};

export const getFundsByCauseType = async (causeType) => {
  return await Fund.find({ cause_type: causeType });
};

export const addSupporterToFund = async (id, supporterData) => {
  try {
    const fund = await Fund.findById(id);
    if (!fund) {
      throw new Error(`Fund with ID ${id} not found`);
    }

    fund.supports.push(supporterData);
    await fund.save();

    return fund; // Return the updated fund document
  } catch (error) {
    throw new Error(`Failed to add supporter to fund: ${error.message}`);
  }
};

