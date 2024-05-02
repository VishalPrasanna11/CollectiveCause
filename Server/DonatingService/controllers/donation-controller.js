import * as DonorsService from '../services/donation-services';

const addDonations = async (req, res) => {
  // console.log(req.body); // Log the request body for debugging purposes

  try {
    // Attempt to add the Donation using DonorsService
    const result = await DonorsService.addDonors(req.body);
    // console.log("Result from Controller: ", result);

    // If adding the fund is successful, respond with a 201 status and the result
    res.status(201).json(result);
  } catch (error) {
    // If an error occurs during Donation addition, catch it here
    console.error("Error in addDonation controller:", error);

    // Respond with a 500 status and an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDonationsByEmail = async (req, res) => {
  // Fetch the email from request parameters
  const { email } = req.params;

  try {
      // Retrieve donations associated with the provided email
      const donations = await DonorsService.getDonationListByEmail(email);

      // Check if donations were found
      if (donations.length === 0) {
          // Respond with a 404 status if no donations found
          return res.status(404).json({ message: 'No donations found for this email.' });
      }

      // If donations are found, respond with a 200 status and the donations
      res.status(200).json(donations);
  } catch (error) {
      // If an error occurs during the retrieval, catch it here
      console.error("Error in getDonationsByEmail controller:", error);

      // Respond with a 500 status and an error message
      res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
addDonations,
getDonationsByEmail
};