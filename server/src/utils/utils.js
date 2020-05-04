// Given an array of user emails, returns array of user ids
const findUsers = async function (members) {
    member_ids = [];
    for (const member of members) {
        userDb = await User.findOne({ email: member });
        member_ids.push(userDb._id);
    }
    return member_ids;
};

module.exports.findUsers = findUsers;
