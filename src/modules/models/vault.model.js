import mongoose from "mongoose";

const vaultSchema = new mongoose.Schema({
    vaultName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    privacy: {
        type: String,
        enum: ['Private', 'Public'],
    },
    theme: {
        type: String,
    },
    vaultMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Member'
        }
    ],
    memory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Memory"
        }
    ],
    familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Family',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }
}, { timestamps: true })

const Vault = new mongoose.model('Vault', vaultSchema);

export default Vault