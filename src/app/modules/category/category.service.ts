import { CategoryCreateInput } from "../../../generated/prisma/models";
import { prisma } from "../../../lib/prisma";

const createCategoryIntoDB = async (payload:{categoriesName:string})=>{
    const {categoriesName} = payload;
    const categoryNameArray = categoriesName.split(",").map(name => name.trim());

    const result = await prisma.category.createManyAndReturn({
        data: categoryNameArray.map(name => ({ name })),
        skipDuplicates: true,
    })

    return result;
}

const getAllCategoriesFromDB = async () => {
    const result = await prisma.category.findMany();
    return result;
}

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB
}