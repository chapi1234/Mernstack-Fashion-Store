import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please provide email and password',
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: true,
                message: 'User does not exist',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
 
        const token = createToken(user._id);

        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                status: 'failed',
                message: 'User already exists',
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: 'failed',
                message: 'Please enter a valid email address',
            });
        } 
        if (password.length < 8) {
            return res.status(400).json({
                status: 'failed',
                message: 'Password must be at least 8 characters long',
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// export const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (email === process.env.ADMIN_EMAIL || password === process.env.ADMIN_PASSWORD) {
//             const token  = jwt.sign(email + password, process.env.JWT_SECRET);
//             res.status(200).json({
//                 success: true,
//                 message: 'Admin logged in successfully',
//                 data: {
//                     token,
//                 },
//             });
//         } else {
//             res.status(401).json({
//                 success: false,
//                 message: 'Invalid credentials',
//             });
//         }

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: 'failed',
//             message: err.message,
//         });
//     }
// };

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token  = jwt.sign(
                { email: process.env.ADMIN_EMAIL, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.status(200).json({
                success: true,
                message: 'Admin logged in successfully',
                token, // <-- send token directly, not inside data object
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
};