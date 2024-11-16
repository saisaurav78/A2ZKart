import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const URI = process.env.URI

const DBconnect= async () => {
    try {
        await mongoose.connect(URI, {dbName:'A2ZKart'})
      const db = mongoose.connection.useDb('A2ZKart');
        console.log('connected to db')

    } catch (error) {
        console.error(error)
    }
}
 

export default DBconnect
