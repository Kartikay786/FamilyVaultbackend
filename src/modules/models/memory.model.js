import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    uploadType:{
        type:String,
        enum:['Audio','Photo','Video']
    },
    uploadBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Member'
    },
    familId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Family'
    },
    vaultId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vault'
    },
    media:{
      type: String,
      required:true
    }
},{timestamps:true})

const Memory = new mongoose.model('Memory',memorySchema);

export default Memory