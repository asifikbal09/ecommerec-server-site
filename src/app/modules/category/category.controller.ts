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

const getAllCategories = catchAsync(async (req, res) => {
    const result = await CategoryService.getAllCategoriesFromDB();

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Categories retrieved successfully",
        data: result
    })
})

const getCategoryWiseProducts = catchAsync(async(req, res)=>{
    const {categoryId} = req.params;
    const result = await CategoryService.getCategoryWiseProductsFromDB(categoryId as string);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Category wise products retrieved successfully",
        data: result
    })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryWiseProducts
};
