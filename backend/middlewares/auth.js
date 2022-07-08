const User = require("../models/User")
const Admin = require("../models/Admin")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async (req,res,next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
          return res.status(401).json({
            message: "Please login first",
          });
        }
    
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
        req.user = await User.findById(decoded._id);
    if(req.user.blockStatus){
      return res.status(404).json({
        success: false,
        message: "User Blocked",
    })
    }
        next();
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
}


exports.protectAdmin = async (req,res,next) => {
  try {
      const { Admintoken } = req.cookies;
      if (!Admintoken) {
        return res.status(401).json({
          message: "Please login first",
        });
      }
  
      const decoded = await jwt.verify(Admintoken, process.env.JWT_SECRET);
  
      req.admin = await Admin.findById(decoded._id);
  
      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
}