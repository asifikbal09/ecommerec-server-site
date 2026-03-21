import z from "zod";


const createUserValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  user: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    address: z.string().min(1, "Address is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    gender: z.enum(["MALE", "FEMALE"], "Gender must be either MALE or FEMALE"),
  }),
});

const createAdminValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  admin: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    contactNo: z.string().min(1, "Contact number is required"),
    gender: z.enum(["MALE", "FEMALE"], "Gender must be either MALE or FEMALE"),
  }),
});
const createManagerValidationSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  manager: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    contactNo: z.string().min(1, "Contact number is required"),
    gender: z.enum(["MALE", "FEMALE"], "Gender must be either MALE or FEMALE"),
  }),
});


export const UserValidation = {
    createUserValidationSchema,
    createAdminValidationSchema,
    createManagerValidationSchema
}
