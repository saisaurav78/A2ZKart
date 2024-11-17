import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required:true
        }

    }

)
const userModel= mongoose.model('User',userSchema, "user")
export default userModel