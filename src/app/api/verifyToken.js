import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'BackupKey');
        return verified.userId;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token Expired');
        } else {
            throw new Error('Invalid token');
        }
    }
}