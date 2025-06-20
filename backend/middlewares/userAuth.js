import jwt from "jsonwebtoken";

const isUser = (req, res, next) => {
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({success: false, message: "Not Authorized, Please login Again"});
    }

    try{
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export default isUser;