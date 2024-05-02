import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const supporterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  donated_amount: { type: Number, default: 0 }
});

const fundSchema = new Schema({
  cause_type: { 
    type: String, 
    required: true },

  fundriser_name: { 
    type: String,
    required: true },

  fundriser_email: { 
    type: String,
    required: true },

  fundriser_phoneNumber: {
     type: Number, 
     required: true },
    
  beneficiary_type: { 
      type: String,
       required: true },
  
  beneficiary_name: { 
    type: String,
     required: true },
  
  image: { 
    type: String,
    
   }, // base64 encoded image
  
  required_amount: {
     type: Number,
    required: true },
    description: { 
    type: String,
    required: true },
    
  title: { 
    type: String, 
    required: true },

    supports: {
      type: [supporterSchema], // Array of supporter subdocuments
      default: undefined // Default value is undefined (allows empty array)
    },
    end_date:{
      type:String,
      required:true
    },

    beneficiary_location:{
      type:String,
      // required:true
    },
    
},
{
  toJSON: { virtuals: true }}
);
  
fundSchema.virtual('remaining_amount').get(function() {
  // Calculate remaining amount using calculateRemainingAmount function
  const remaining = calculateRemainingAmount(this.required_amount, this.received_amount);
  return remaining;
});

// Function to calculate remaining amount
function calculateRemainingAmount(requiredAmount, receivedAmount) {
  return requiredAmount - receivedAmount;
}

fundSchema.virtual('raised_percentage').get(function() {
  // Calculate raised percentage
  if (this.required_amount === 0) {
    return 0; // Handle division by zero case
  }
  return (this.received_amount / this.required_amount) * 100;
});

fundSchema.virtual('totalSupporters').get(function() {
  return this.supports.length;
});

fundSchema.virtual('received_amount').get(function() {
  let totalReceived = 0;
  if (this.supports && this.supports.length > 0) {
    totalReceived = this.supports.reduce((sum, supporter) => sum + supporter.donated_amount, 0);
  }
  return totalReceived;
});

const Fund = model('FundRising', fundSchema);

export default Fund;
