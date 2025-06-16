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
    family: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Family'
        }
    ],
    memory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Memory"
        }
    ],
    vault: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vault"
        }
    ]
}, { timestamps: true })

const Member = new mongoose.model('Member', memberScehema);

export default Member