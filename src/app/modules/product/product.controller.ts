import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
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

export const ProductController = {
  createProduct,
};