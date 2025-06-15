import bcrypt from "bcrypt";
import Family from "../models/family.model.js";
import Member from "../models/member.model.js";

const regsiterFamily = async (req, res) => {
    const { familyName, description, email, password } = req.body;
    const profileImage = req.files?.profileImage?.[0]?.filename || "";

    try {
        const existEmail = await Family.findOne({ email ,familyName });
        if (existEmail) return res.status(404).json({ message: 'Email and familyName is Already used. Try Some other' });

        const family = new Family({ familyName, description, email, password, profileImage });

        const salt = await bcrypt.genSalt(10);
        family.password = await bcrypt.hash(password, salt);

        await family.save();

        if (family) return res.status(200).json({ message: 'Family Registered Successfully', family });

    }
    catch (err) {
         return res.status(500).json({message:'Server error'})
    }
}

const loginFamily = async (req, res) => {
    const { email, familyName, password } = req.body;

    try {
        // 1. Find the family by name
        const family = await Family.findOne({ familyName }).populate('member.member');

        if (!family) return res.status(400).json({ message: 'Family not found' });

        let isFamilyEmail = false;
        let isMemberEmail = false;

        // 2. Check if email matches family
        if (family.email === email) {
            isFamilyEmail = true;
        } else {
            // 3. Check in members
            for (const mem of family.member) {
                if (mem.member?.email === email) {
                    isMemberEmail = true;
                    break;
                }
            }
        }

        if (!isFamilyEmail && !isMemberEmail) {
            return res.status(400).json({ message: 'Email not found in family or members' });
        }

        // 4. Password check
        const isMatch = await bcrypt.compare(password, family.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        res.status(200).json({
            message: 'Login successful',
            loginType: isFamilyEmail ? 'Family' : 'Member',
            family ,
            loginEmail : email,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const familyProfile = async (req,res) => {
    const {familyId} = req.params;

    try{
        const family = await Family.findById(familyId).populate('member.member');
        if(!family) return res.status(400).json({message:'Family not found'});

        return res.json({message:'Family profile',family});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }
}

export {regsiterFamily,loginFamily,familyProfile}


