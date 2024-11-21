async function showMyProfile(req, res) {
    try {
       const user = req.user;
       res.send(user);
    } catch (error) {
        res.status(400).json({
            message : "Error : " + error.message
        })
    }
}

module.exports = {showMyProfile}