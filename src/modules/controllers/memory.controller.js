import Family from "../models/family.model.js";
import Member from "../models/member.model.js";
import Memory from "../models/memory.model.js";
import Vault from "../models/vault.model.js";

const addMemory = async (req, res) => {
    let { title, description, uploadType, uploadBy, familId, vaultId } = req.body;
    const profileImage = req.files?.profileImage?.[0]?.filename || '';
    const video = req.files?.video?.[0]?.filename || '';
    const audio = req.files?.audio?.[0]?.filename || '';

    try {
        const family = await Family.findById(familId);

        // Convert "null" string or empty string to undefined
        if (uploadBy === 'null' || uploadBy === '') uploadBy = undefined;
        if (vaultId === 'null' || vaultId === '') vaultId = undefined;

        const media = uploadType === 'Photo' ? profileImage : uploadType === 'Video' ? video : audio;

        const memoryData = { title, description, uploadType, familId, media };
        
        if (uploadBy) memoryData.uploadBy = uploadBy;
        if (vaultId) memoryData.vaultId = vaultId;

        const memory = new Memory(memoryData);
        await memory.save();

        family.memory.push(memory._id);
        await family.save();

        if (uploadBy) {
            const member = await Member.findById(uploadBy);
            if (member) {
                member.memory.push(memory._id);
                await member.save();
            }
        }

        if (vaultId) {
            const vault = await Vault.findById(vaultId);
            if (vault) {
                vault.memory.push(memory._id);
                await vault.save();
            }
        }

        return res.json({ message: 'Memory uploaded successfully', memory });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
};



const memoryById = async (req, res) => {
    const { memoryId } = req.params;

    try {
        const memory = await Memory.findById(memoryId).populate('vaultId').populate('uploadBy');
        if (!memory) return res.status(400).json({ message: 'No memory exist with this id' });

        return res.json({ memory });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

const allMemoryByFamilyId = async (req, res) => {
    const { familId } = req.params;

    try {
        const memory = await Memory.find({ familId }).populate('uploadBy').populate('vaultId');
        if (!memory) return res.status(400).json({ message: 'This family have no Memory found ' });

        return res.json({ memory })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

const editMemory = async (req, res) => {
    const { memoryId } = req.params;
    const { title, description, uploadType } = req.body;
    const profileImage = req.files?.profileImage?.[0].filename || '';
    const video = req.files?.video?.[0]?.filename || '';

    try {
        const memory = await Memory.findOne({ memoryId });
        if (!memory) return res.status(400).json({ message: 'This family have no Memory found ' });

        const media = uploadType === 'Photo' ? profileImage : video;

        memory.title = title || memory.title;
        memory.description = description || memory.description;
        memory.media = media || memory.media;

        console.log(memory);
        await memory.save();

        return res.json({ message: 'memory uploaded successfully', memory })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }

}

const deleteMemory = async (req, res) => {
    const { vaultId, familId, memoryId } = req.params;

    try {
        const family = await Family.findById(familId);
        const vault = await Vault.findById(vaultId)

        const memory = await Memory.findByIdAndDelete(memoryId);
        if (!memory) return res.status(400).json({ message: 'No memory found' });

        if (vaultId) {
            vault.memory = vault.memory.filter(memId => memId.toString() !== memoryId);
            await vault.save();

        }

        family.memory = family.memory.filter(memId => memId.toString() !== memoryId);
        await family.save();

        return res.json({ message: 'Member deleted From vault', vault })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server error' })
    }
}

export { addMemory, memoryById, allMemoryByFamilyId, editMemory, deleteMemory }