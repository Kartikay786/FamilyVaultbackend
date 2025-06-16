import Family from "../models/family.model.js";
import Member from "../models/member.model.js";
import Memory from "../models/memory.model.js";
import Vault from "../models/vault.model.js";

const addMemory = async (req, res) => {
    const { title, description, uploadType, uploadBy, familId, vaultId } = req.body;
    const profileImage = req.files?.profileImage?.[0].filename || '';
    const video = req.files?.video?.[0]?.filename || '';

    try {
        const family = await Family.findById(familId);
        const member = await Member.findById(uploadBy)




        const media = uploadType === 'Photo' ? profileImage : video;

        if (vaultId) {
            const memory = new Memory({ title, description, uploadType, uploadBy, familId, vaultId, media });
            console.log(memory);
            await memory.save();

            family.memory.push(memory._id);
            await family.save();

            member.memory.push(memory._id);
            await member.save();

            if (vaultId) {
                const vault = await Vault.findById(vaultId);
                vault.memory.push(memory._id);
                await vault.save();
            }


            return res.json({ message: 'memory uploaded successfully', memory })
        } {
            const memory = new Memory({ title, description, uploadType, uploadBy, familId, media });
            console.log(memory);
            await memory.save();



            family.memory.push(memory._id);
            await family.save();

            member.memory.push(memory._id);
            await member.save();

            if (vaultId) {
                const vault = await Vault.findById(vaultId);
                vault.memory.push(memory._id);
                await vault.save();
            }


            return res.json({ message: 'memory uploaded successfully', memory })
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}


const memoryById = async (req,res)=>{
    const {memoryId} = req.params;

    try{
        const memory = await Memory.findById(memoryId).populate('vaultId').populate('uploadBy');
        if(!memory) return res.status(400).json({message:'No memory exist with this id'});

        return res.json({memory});
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export { addMemory, memoryById }