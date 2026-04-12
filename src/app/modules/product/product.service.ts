import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { IOptions, paginationHelper } from "../../helper/paginationHelper";
import { ProductSearchableFields } from "./product.constant";

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

const getAllProductsFromDB = async (filters:any, options:IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm,tags,minPrice,maxPrice, ...filtersData } = filters;

    const andConditions:Prisma.ProductWhereInput[] = [];
    
    if (searchTerm) {
       andConditions.push({
         OR: ProductSearchableFields.map((field)=>({
            [field]:{
                contains: searchTerm,
                mode: "insensitive"
            }
        }))
       })
    }

    if(tags){
        andConditions.push({
            tags:{
                hasSome: tags.split(",")
            }
        })
    }

    if(minPrice || maxPrice){
        const priceFilter:Prisma.FloatFilter<"Product"> = {};
        if(minPrice){
            priceFilter.gte = Number(minPrice);
        }
        if(maxPrice){
            priceFilter.lte = Number(maxPrice);
        }
        andConditions.push({
            price: priceFilter
        })
    }

    if(Object.keys(filtersData).length>0){
        const filtersConditions = Object.keys(filtersData).map((key)=>({
            [key]:{
                equals: filtersData[key]
            }
        }))
        andConditions.push(...filtersConditions)
    }

    const whereConditions:Prisma.ProductWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.product.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    })

    const total = await prisma.product.count({
        where: whereConditions
    })

    return {
        meta:{
            page,
            limit,
            total
        },
        data: result
    }

}

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB
};
