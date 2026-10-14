import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
