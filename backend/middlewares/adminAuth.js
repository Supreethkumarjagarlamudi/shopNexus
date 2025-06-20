import jwt from "jsonwebtoken";
const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.status(401).json({success: false, message: "Not Authorized, Please login Again"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PWD)){
            return res.status(403).json({success: false, message: "Not Authorized, Please login Again"});
        }
        next();
    }
    catch (error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export default isAdmin;