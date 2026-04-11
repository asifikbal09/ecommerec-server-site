import z from "zod";
import { SkinTypeEnum } from "../../../generated/prisma/enums";

const createProductValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    tags: z.array(z.string()),
    price: z.number().positive("Price must be a positive number"),
    discountRate: z.number().min(0).max(100).optional(),
    brand: z.string().min(1).optional(),
    size: z.string().min(1).optional(),
    skinType: z.enum(SkinTypeEnum, "Invalid skin type"),
    categoryId: z.string().min(1, "Category ID is required"),
})

export const ProductValidation ={
    createProductValidationSchema
}