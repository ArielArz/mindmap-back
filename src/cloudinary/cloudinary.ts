import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env.local' });

export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: (): ConfigOptions => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return cloudinary as ConfigOptions;
  },
};