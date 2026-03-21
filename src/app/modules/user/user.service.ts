import { Request } from "express";
import config from "../../../config";
import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { fileUploader } from "../../helper/fileUploader";

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

export const UserService ={
    createUserIntoDB
}