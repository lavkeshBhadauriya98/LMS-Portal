import User from "../models/user.model.js"; 
import AppError from "../Utils/error.util.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Fixed maxAge calculation
    httpOnly: true,
    secure: true,
};

const register = async (req, res, next) => {
    const { name, email, password, confirmpassword } = req.body;
    if (!name || !email || !password || !confirmpassword) {
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new AppError('Email already exists', 400));
    }

    const user = await User.create({
        fullName: name,
        email,
        password,
    });

    if (!user) {
        return next(new AppError('User registration failed, please try again', 400));
    }

    user.password = undefined;

    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOptions);
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
};

const login = async (req, res, next) => { 
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }

        const user = await User.findOne({ email }).select('+password'); 
        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError('Email and password do not match', 400));
        }

        const token = await user.generateJWTToken(); // Fix method name if needed
        user.password = undefined; // Hide password from response
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

const logout = (req, res) => {
   res.cookie('token',null,{

    secure: true,
    maxAge: 0,
    httpOnly: true
   });
   res.status(200).json({
    success:true,
    message: 'user logged out successfully'
   })
};

const getProfile = async(req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userID);
        res.status(200).json({
            success:true,
            message: 'User'
        })
    } catch (error) {
        return next(new AppError("Failed to fetch profile", 500));
        
    }
};

export {
    register,
    login,
    logout,
    getProfile,
};
