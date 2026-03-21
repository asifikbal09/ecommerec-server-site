import bcrypt from "bcryptjs";
import config from "../../../config";
import { prisma } from "../../../lib/prisma";
import  httpStatus  from "http-status";
import ApiError from "../../error/ApiError";
import { JwtHelpers } from "../../helper/jwtHelper";
import { IUserPayload } from "../user/user.interface";


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

const passwordChange = async ({oldPassword, newPassword}: {oldPassword: string, newPassword: string},user: IUserPayload) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where:{
            email: user.email
        }
    })

    const isCorrectPassword = await bcrypt.compare(
        oldPassword,
        userInfo.password,
    );

    if (!isCorrectPassword) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    const hashedNewPassword = await bcrypt.hash(
        newPassword,
        Number(config.salt_rounds)
    );

    const result = await prisma.user.update({
        where: {
            email: user.email
        },
        data: {
            password: hashedNewPassword,
            isPasswordChanged: true
        }
    });

    return result;
};

export const AuthService = {
  login,
  passwordChange
};