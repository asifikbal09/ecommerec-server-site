import { Request } from "express";
import config from "../../../config";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { fileUploader } from "../../helper/fileUploader";
import { RoleEnum } from "../../../generated/prisma/enums";

const createUserIntoDB = async (req:Request)=>{
     if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.user.imageUrl = uploadResult?.secure_url;
  }
    
    const hashedPassword = await bcrypt.hash(req.body.password, Number(config.salt_rounds));

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: req.body.user.email,
                password: hashedPassword,
            }
        })

        return await tnx.userProfile.create({
            data:req.body.user
        })
    })

    return result;
}

const createAdminIntoDB = async (req:Request)=>{
     if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.admin.imageUrl = uploadResult?.secure_url;
  }
    
    const hashedPassword = await bcrypt.hash(req.body.password, Number(config.salt_rounds));

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: req.body.admin.email,
                password: hashedPassword,
                role: RoleEnum.ADMIN
            }
        })

        return await tnx.adminProfile.create({
            data:req.body.admin
        })
    })

    return result;
}

const createManagerIntoDB = async (req:Request)=>{
     if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    req.body.manager.imageUrl = uploadResult?.secure_url;
  }
    
    const hashedPassword = await bcrypt.hash(req.body.password, Number(config.salt_rounds));

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email: req.body.manager.email,
                password: hashedPassword,
                role: RoleEnum.MANAGER
            }
        })

        return await tnx.managerProfile.create({
            data:req.body.manager
        })
    })

    return result;
}

export const UserService ={
    createUserIntoDB,
    createAdminIntoDB,
    createManagerIntoDB

}