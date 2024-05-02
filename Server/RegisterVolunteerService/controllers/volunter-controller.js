import * as volunteerService from '../services/volunteer-services.js';
import { httpLogger } from '../logger.js';

const formatHTTPLoggerResponse = (req, res, data) => {
  return {
    method: req.method,
    url: req.originalUrl,
    status: res.statusCode,
    message: data.message, // Include the error message from data
    data: data
  };
};

// Get all Volunteer'sID
export const get = async (req, res) => {
  try {
    const allVounteer = await volunteerService.getAll();
    res.json(allVounteer);
    httpLogger.info('Success message', 
    formatHTTPLoggerResponse(req, res,allVounteer)
  )    
  } catch (error) {
    res.status(500).json({ message: error.message });
    httpLogger.error('Failure message', 
    formatHTTPLoggerResponse(req, res, 
    { message: `Failed to get all the Volunteers` }))
  }
};

// Add
export const post = async (req, res) => {
  try {
    const vounteerData = req.body;
    const newvounteerData = await volunteerService.post(vounteerData);
    res.status(201).json(newvounteerData);
    httpLogger.info('Success message', 
    formatHTTPLoggerResponse(req, res, newvounteerData)
  )
  } catch (error) {
    res.status(400).json({ message: error.message });
    httpLogger.error('Failure message', 
    formatHTTPLoggerResponse(req, res, 
    { message: `Failed to get add the Volunteer ` }))
  }
};

// Delete
// Delete
export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    await volunteerService.deleteVolunteer(id); // Corrected function call
    res.status(200).json({ message: "Deleted Succesfull" });
    httpLogger.info('Success message', 
      formatHTTPLoggerResponse(req, res, { message: `Deleted Volunteer with id ${id}` })
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
    httpLogger.error('Failure message', 
      formatHTTPLoggerResponse(req, res, { message: `Failed to delete Volunteer with id ${id}`, error: error.message })
    );
  }
};


// Get by CampionID

export const getByCampionID= async(req, res)=> {
  const CampionID = req.params.CampionID;
  console.log(`thisis from Controller `,CampionID);
  try {
      const volunteers = await volunteerService.getByCampionID(CampionID); // Changed from getByCampionID to getByCampionIDService
      // console.log()
      res.json(volunteers);
  } catch (error) {
      console.error('Error fetching volunteers for CampionID:', error);
      res.status(500).json({ error: 'Failed to fetch volunteers for CampionID' });
      httpLogger.error('Failure message', 
  formatHTTPLoggerResponse(req, res, 
  { message: `Failed to fetch volunteers for CampionID` }))
  }
}