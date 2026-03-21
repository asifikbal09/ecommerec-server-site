import bcrypt from "bcryptjs";
import config from "../../../config";
import { prisma } from "../../../lib/prisma";
import  httpStatus  from "http-status";
import ApiError from "../../error/ApiError";
import { JwtHelpers } from "../../helper/jwtHelper";


const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const accessToken = JwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt.access_token_secret as string,
    config.jwt.access_token_expire_time as string,
  );

  const refreshToken = JwtHelpers.generateToken(
    { email: user.email, role: user.role },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expire_time as string,
  );
  return {
    accessToken,
    refreshToken,
    isPasswordChange: user.isPasswordChanged,
  };
};

export const AuthService = {
  login,
};