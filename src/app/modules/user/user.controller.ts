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
const createAdmin = catchAsync(async (req, res) => {

    const result = await UserService.createAdminIntoDB(req);


    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Admin created successfully',
        data: result
    })
});
const createManager = catchAsync(async (req, res) => {

    const result = await UserService.createManagerIntoDB(req);


    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: 'Manager created successfully',
        data: result
    })
});



export const UserController = {
    createUser,
    createAdmin,
    createManager
}