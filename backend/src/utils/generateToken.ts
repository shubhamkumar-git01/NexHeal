import jwt from 'jsonwebtoken';

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret_nexheal_2026', {
    expiresIn: '30d',
  });
};

export default generateToken;
