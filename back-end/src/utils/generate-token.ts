import jwt from 'jsonwebtoken';

const generateToken = (payload: string) => {
  const jwtExpiration = process.env.JWT_EXPIRATION || '3d';
  const jwtSecret = process.env.JWT_SECRET;

  try {
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ id: payload }, jwtSecret, { expiresIn: jwtExpiration });
    return token;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Token generation failed:', error);
    return null;
  }
};

export default generateToken;
