import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FilesUploadRepository {
  async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            const message =
              typeof error === 'string'
                ? error
                : error instanceof Error
                  ? error.message
                  : JSON.stringify(error);
            return reject(new Error(message)); // 👈 Este sí cumple la regla
          }

          if (!result) {
            return reject(new Error('Upload failed'));
          }

          resolve(result);
        },
      );

      const stream = new Readable();
      stream.push(file.buffer);
      stream.push(null);
      stream.pipe(upload);
    });
  }

  /* eslint-disable @typescript-eslint/no-floating-promises */
  async deleteFile(publicId: string, resourceType: string): Promise<void> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error: unknown) => {
          if (error) {
            const message =
              typeof error === 'string'
                ? error
                : error instanceof Error
                  ? error.message
                  : JSON.stringify(error);
            return reject(new Error(message));
          }
          resolve();
        },
      );
    });
  }
}
