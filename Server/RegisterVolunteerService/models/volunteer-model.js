import mongoose from 'mongoose';

// Define the schema
const volunteerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    CampionID: {
        type: String,
        required: true
    },
    volunterID: {
        type: String,
        required: true
    }
});

volunteerSchema.pre('save', async function(next) {
    // Only generate new ID if it's not already set
    if (!this.volunterID) {
        let newVolunteerID;
        
        // Generate a random 8-digit number
        const randomNumber = Math.floor(10000000 + Math.random() * 90000000);

        // Ensure the generated number is 8 digits long
        const paddedNumber = randomNumber.toString().padStart(8, '0');

        // CollectiveCause Volunteer ID
        newVolunteerID = `CCVID${paddedNumber}`; // Concatenate prefix and number
        
        this.volunterID = newVolunteerID; // Set the new Volunteer ID
    }
    next();
});

// Register the model with Mongoose
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
