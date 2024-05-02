import volunteerSchema from "../models/volunteer-model.js";

export const getAll = async () => {
  return await volunteerSchema.find();
};
// filter

// add
export const post = async (volunteerData) => {
  return await volunteerSchema.create(volunteerData);
};

// Delete
export const deleteVolunteer = async (id) => {
  return await volunteerSchema.findByIdAndDelete(id);
};

// Get voluntters by CampionID

export const getByCampionID = async (id) => {
  const CampionID = id
  try {
    const volunteers = await volunteerSchema.find({CampionID }); 
    // Use CampionID to query the database
    return volunteers;
  } catch (error) {
    console.error('Error fetching volunteers for CampionID:', error);
    res.status(500).json({ error: 'Failed to fetch volunteers for CampionID' });
    httpLogger.error('Failure message', 
      formatHTTPLoggerResponse(req, res, 
        { message: `Failed to fetch volunteers for CampionID`, error: error.message }))
  }
}