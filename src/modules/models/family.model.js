import mongoose from "mongoose";

const familySchema = new mongoose.Schema({
    familyName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    profileImage: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    member: [
        {
            member: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member'
            },
            addedBy: {
                type: String
            },
            role: {
                type: String,
                enum: ['Admin', 'Member']
            },
            relation: {
                type: String
            }
        }
    ],
    vault: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vault"
        }
    ],
    memory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Memory"
        }
    ],
    role: {
        type: String,
        default: 'SuperAdmin'
    },

}, { timestamps: true })

const Family = new mongoose.model('Family', familySchema);

export default Family