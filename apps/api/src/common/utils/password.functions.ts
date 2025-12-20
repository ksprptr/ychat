import * as bcrypt from 'bcrypt';

const saltRounds = 12;

/**
 * Function to hash a password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * Function to compare a password with a hash
 */
export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};
