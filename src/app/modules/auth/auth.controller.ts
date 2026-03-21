import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IUserPayload } from "../user/user.interface";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    sameSite: "none",
  });
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User logged in successfully",
    data: {
      isPasswordChange: result.isPasswordChange,
    },
  });
});

const passwordChange = catchAsync(async (req, res) => {
  const user = req.user as IUserPayload;
  const result = await AuthService.passwordChange(req.body, user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const AuthController = {
  login,
  passwordChange,
};
