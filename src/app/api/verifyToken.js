import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'BackupKey');
        return verified.userId;
    } catch (error) {
        console.log("verifyToken: " + error);
        throw error
    }
}