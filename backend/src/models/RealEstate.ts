import mongoose from "mongoose";

const realEstateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  agent: {
    type: mongoose.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
});

export default mongoose.model('RealEstate', realEstateSchema);
