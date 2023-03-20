import bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, receivedPassword);
};
