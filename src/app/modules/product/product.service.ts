import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../../lib/prisma";

const createProductIntoDB = async (req: Request) => {
    let imageUrl = undefined
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    imageUrl = uploadResult?.secure_url;
  }

  const productData ={
    ...req.body,
    imageUrl

  }
  console.log(productData)

  const result = await prisma.product.create({
    data: productData
  })

  return result;
};

export const ProductService = {
  createProductIntoDB,
};
