import Family from "../models/family.model.js";
import Member from "../models/member.model.js";

const addMember = async (req, res) => {
    const { familyId, memberId, memberName, bio, Dob, email, phone, relation, role } = req.body;
    const profileImage = req.files?.profileImage?.[0]?.filename || '';

    try {
        const family = await Family.findById(familyId);
        const member = await Member.findById(memberId);

        if (!family && !member) return res.status(400).json({ message: 'Family Id and Member Id both are not found. One of them are required' });

        const existingMember = await Member.findOne({ email });

        if (existingMember) {
            // Now check if this Member is already added to the family
            const isAlreadyInFamily = family.member.some(m => m?.member.toString() === existingMember._id.toString());

            if (isAlreadyInFamily) {
                return res.status(400).json({ message: 'Member already exists in this family' });
            }

            // If member exists but not in this family, add their ObjectId
            family.member.push({ member: existingMember._id, addedBy: memberId || familyId,role,relation });
            existingMember.family.push(familyId);

            await family.save();
            await existingMember.save();
            return res.status(200).json({ message: 'Existing member added to family', existingMember });
        }


        const newMember = new Member({ memberName, bio, Dob, email, phone, profileImage });
        newMember.family.push(familyId);
        await newMember.save();


        family.member.push({ member: newMember._id, addedBy: memberId || familyId ,role,relation });
        await family.save();

        console.log(family, newMember);
        return res.status(200).json({ message: 'New Member created and added into your family' })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

const findMemberByemail = async (req, res) => {
    const { email, familyId } = req.params;

    try {
        console.log(email)
        const member = await Member.findOne({ email });
        if (!member) return res.status(400).json({ message: 'No member found with this email id' });

        console.log(member)
        const isInFamily = member.family.some(famId => famId.toString() === familyId);
        if (!isInFamily) return res.status(400).json({ message: 'This member does not belong to the given family' });


        return res.json({ message: 'Member fetched', member });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' })
    }
}

export { addMember, findMemberByemail }