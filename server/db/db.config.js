import mongoose from "mongoose"
const connectDatabase = async()=>{
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-app"
        const x =  await mongoose.connect(MONGO_URI)
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    } catch (error) {
        console.log("Err connecting to mongo: ",error)
    }
};
export default connectDatabase