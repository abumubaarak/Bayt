import { sign } from "jsonwebtoken";

export const signJwtToken = (id: any) => {
  return sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE!,
  });
};
