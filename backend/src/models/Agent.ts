import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  realEstates: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'RealEstate',
    },
  ],
  photo: {
    type: String,
    required: true,
  },
});

agentSchema.plugin(uniqueValidator);

export default mongoose.model('Agent', agentSchema);