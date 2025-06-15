import mongoose from "mongoose";

const dbConnection = ()=>{
    const Uri = process.env.MONGO_URI;

    mongoose.connect(Uri)
    .then(()=>{
        console.log('Db connected')
    })
    .catch((err)=>{
        console.log('Error at db connection',err)
    })
    
}

export default dbConnection