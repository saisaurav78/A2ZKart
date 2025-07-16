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
    default: null,
  },
  provider: {
    type: String,
    required: true,
    enum: ['local', 'google'],
    default: 'local',
  },
});

// Apply partial index to only Google users (those with googleId set)
userSchema.index(
  { googleId: 1 },
  { unique: true, sparse: true, partialFilterExpression: { provider: 'google' } }
);

const userModel= mongoose.model('User',userSchema, "user")
export default userModel