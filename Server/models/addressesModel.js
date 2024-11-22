import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
    },
    country: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    }
});
const addressModel = mongoose.model('Address', addressSchema, 'address');
export default addressModel;
