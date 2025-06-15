import mongoose from "mongoose";

const memberScehema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    Dob: {
        type: String,
    },
    profileImage: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    phone: {
        type: Number
    },
    relation: {
        type: String, required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Member"]
    },
    family: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Family'
        }
    ],
    memory: []
}, { timestamps: true })

const Member = new mongoose.model('Member', memberScehema);

export default Member