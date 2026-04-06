import { send } from "node:process";
import catchAsync from "../../shared/catchAsync";
import { CategoryService } from "./category.service";
import sendResponse from "../../shared/sendResponse";

const createCategory =catchAsync(async (req, res) => {
    const result = await CategoryService.createCategoryIntoDB(req.body);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: result
    })

})
export const CategoryController = {
  createCategory
};
