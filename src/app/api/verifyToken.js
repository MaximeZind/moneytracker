import jwt from 'jsonwebtoken';

export function verifyToken(token) {
    const verified = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : 'BackupKey');
    console.log(verified);
    return verified;
}