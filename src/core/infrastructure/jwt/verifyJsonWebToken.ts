import jwt from "jsonwebtoken";
export function verifyJsonWebToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRETKEY as string);
}
