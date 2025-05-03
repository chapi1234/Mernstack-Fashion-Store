// import jwt from 'jsonwebtoken';

// export const adminAuth = (req, res, next) => {
//     try {
//         const token = req.headers;
//         if (!token) {
//             return res.status(401).json({
//                 status: 'failed',
//                 message: 'Not authorized',
//             });
//         }
    
//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         if (token_decode !== process.env.ADMIN_EMAILL + process.env.ADMIN_PASSWORD) {
//             return res.status(401).json({
//                 status: 'failed',
//                 message: 'Not authorized',
//             });
//         }
//         next();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: 'failed',
//             message: err.message,
//         });
//     }
// }

import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'failed',
                message: 'Not authorized, token missing',
            });
        }

        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token matches admin credentials
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                status: 'failed',
                message: 'Not authorized',
            });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'failed',
            message: err.message,
        });
    }
};