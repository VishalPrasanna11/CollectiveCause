import Donors from "../models/donation-model";

export const addDonors = async (data) => {
  const donors = new Donors(data);
  return await donors.save();
};

export const getDonationListByEmail = async (email) => {
  return await Donors.find({ donor_email: email });
};
