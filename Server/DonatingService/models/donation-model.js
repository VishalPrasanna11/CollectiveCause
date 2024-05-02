import mongoose from 'mongoose';

const { Schema, model } = mongoose;



const donorsSchema = new Schema({
  donaor_name: { 
    type: String, 
    required: true },

    donaor_email: { 
    type: String,
    required: true },

  fundrise_id: { 
    type: String,
    required: true },

  donation_amount: {
     type: Number, 
     required: true },
    
  }
);

const Donors = model('Donors', donorsSchema);

export default Donors;
