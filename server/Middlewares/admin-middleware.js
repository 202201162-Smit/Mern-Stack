const adminmiddleware = async (req, res, next) => {
    try {
        const adminrole = req.user.isadmin
        if(!adminrole){
            return res.status(403).json({message : "Access Denied, you are not a Admin"})
        }
        next()
        // res.status(200).json({msg : req.user})
    } catch (error) {
        next(error);
    }
}

module.exports = adminmiddleware