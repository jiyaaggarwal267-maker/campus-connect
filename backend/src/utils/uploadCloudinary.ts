import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";


export const uploadToCloudinary = (
  buffer: Buffer
): Promise<any> => {

  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "campusconnect/events",
        resource_type: "image",
      },
      (error, result) => {

        if (error) {
          reject(error);
          return;
        }

        resolve(result);

      }
    );


    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);

  });

};