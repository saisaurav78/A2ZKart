import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: {
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
    required: function () {
        return this.provider==='local'
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
    default: null,
  },
  provider: {
    type: String,
    required: true,
    enum: ['local', 'google'],
    default: 'local',
  },
});
const userModel= mongoose.model('User',userSchema, "user")
export default userModel