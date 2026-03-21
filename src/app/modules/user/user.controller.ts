import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res) => {

    const result = await UserService.createUserIntoDB(req);


    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'User created successfully',
        data: result
    })
});

export const UserController = {
    createUser
}