import pick from "../../helper/pick";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ProductFilterableFields } from "./product.constant";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductService.createProductIntoDB(req);

    sendResponse(res,{
        statusCode: 201,
        success: true,
        message: "Product created successfully",
        data: result
    })  
})

const getAllProducts = catchAsync(async (req, res) => {

    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, ProductFilterableFields);

    const result = await ProductService.getAllProductsFromDB(filters, options);

    sendResponse(res,{
        statusCode: 200,
        success: true,
        message: "Products retrieved successfully",
        meta: result.meta,
        data: result.data
    })  
})  

export const ProductController = {
  createProduct,
  getAllProducts
};