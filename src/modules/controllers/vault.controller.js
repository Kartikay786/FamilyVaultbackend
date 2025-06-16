import Family from "../models/family.model.js";
import Member from "../models/member.model.js";
import Vault from "../models/vault.model.js";

const createVault = async (req,res)=>{
    const {vaultName ,description,privacy,theme,vaultMembers,familyId,createdBy} = req.body;
    const profileImage = req.files?.profileImage?.[0]?.filename || '';

    // console.log(vaultName,description,privacy,theme,familyId,createdBy);
    try{
        const family = await Family.findById(familyId);
        const member = await Member.findById(createdBy);
        if(!member) return res.status(400).json({message:'Invalid member id'});

        const vault = await Vault.findOne({vaultName});
        if(vault){
        const vaultisinfamily = vault.familyId.toString() === familyId.toString();
        if(vaultisinfamily){
            const isVaultCreatedBySame = vault.createdBy.toString() === createdBy.toString();
            if(isVaultCreatedBySame) {
                const checkPrivacy = vault.privacy === privacy ;
                if(checkPrivacy) return res.status(400).json({message:'Same name vault is already created in this family with this member with same privacy access'});
            }
        }
        }

        const newVault = new Vault({vaultName,description,privacy,theme,coverImage:profileImage,familyId,createdBy});

        await newVault.save();

        family.vault.push(newVault._id) ;
        family.save();

        member.vault.push(newVault._id);
        member.save();

        return res.status(200).json({message:'Vault created successfully and added to family and given member',newVault})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'})
    }
}

const vaultByFamilyId = async (req,res)=>{
    const {familyId,memberId} = req.params;

    try{
        const family = await Family.findById(familyId).populate('member.member');
        if(!family) return res.status(400).json({message:'Invalid familyid'});

        const vaults = await Vault.find({familyId,$or :[{createdBy:memberId},{privacy:'Public'}]}).populate('createdBy').populate('memory');
        if(!vaults) return res.status(400).json({message:'No vaults found with this family id'});

        return res.json({vaults});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'})
    }
}   

const getVaultByVaultId = async (req,res)=>{
    const {vaultId} = req.params;

    try{
        const vault = await Vault.findById(vaultId).populate('createdBy').populate('memory').populate('memory.uploadBy');
        if(!vault) return res.status(400).json({message:'No vault found'});

        return res.json({message:'Vault found',vault})
    }
     catch(err){
        console.log(err);
        return res.status(500).json({message:'Server error'})
    }
}

export {createVault,vaultByFamilyId,getVaultByVaultId}