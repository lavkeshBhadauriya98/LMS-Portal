import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [5, 'Name must be at least 5 characters'],
        maxlength: [50, 'Name should be less than 50 characters'],
        lowercase: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
}, {
    timestamps: true
});

// Pre-save middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Schema methods
userSchema.methods = {
    generateJWTToken: async function() {
        return await jwt.sign(
            { 
                id: this._id,
                email: this.email,
                role: this.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
        );
    },
    comparePassword: async function(plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    }
};


const User = model('User', userSchema);

export default User;
