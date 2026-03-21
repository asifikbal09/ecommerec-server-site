import dotenv from 'dotenv';
import { access } from 'fs';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt:{
        access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        access_token_expire_time: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
        refresh_token_expire_time: process.env.JWT_REFRESH_TOKEN_EXPIRATION
    },
    cloudinary:{
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }

}