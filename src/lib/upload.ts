// import { prisma } from "@/lib/prisma";
// import {
//   DeleteObjectCommand,
//   GetObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import dayjs from "dayjs";
// import { v1 } from "uuid";

// interface FileDataInput {
//   filePath: string;
//   paramKey: string;
//   file: File;
// }

// interface FileRecord {
//   id: number;
//   file_path: string;
//   upload_file_name: string;
//   storage_file_name: string;
//   file_size: number;
//   extension_name: string;
//   created_at: string;
//   updated_at: string;
// }

// interface S3Response {
//   $metadata: {
//     httpStatusCode: number | undefined;
//   };
// }

// const Bucket = process.env.S3_UPLOAD_BUCKET;
// const s3 = new S3Client({
//   region: process.env.S3_UPLOAD_REGION,
//   credentials: {
//     accessKeyId: process.env.S3_UPLOAD_ACCESS_KEY as string,
//     secretAccessKey: process.env.S3_UPLOAD_SECRET_ACCESS_KEY as string,
//   },
// });

// /** 파일관리 테이블에 insert */
// export const addFileData = async ({
//   filePath,
//   paramKey,
//   file,
// }: FileDataInput): Promise<FileRecord> => {
//   const now: string = dayjs().add(9, "hours").toISOString();
//   try {
//     const fileData = await prisma.file.create({
//       data: {
//         file_path: filePath,
//         upload_file_name: file.name,
//         storage_file_name: paramKey,
//         file_size: file.size,
//         extension_name: file.type,
//         created_at: now,
//         updated_at: now,
//       },
//     });
//     return fileData;
//   } catch (error) {
//     throw new Error(`Failed to add file data: ${error}`);
//   }
// };

// /** 파일관리 테이블 update by id */
// export const setFileData = async (
//   id: number,
//   newFile: FileDataInput
// ): Promise<FileRecord> => {
//   try {
//     const fileData = await prisma.file.update({
//       where: { id },
//       data: {
//         file_path: newFile.filePath,
//         upload_file_name: newFile.file.name,
//         storage_file_name: newFile.paramKey,
//         file_size: newFile.file.size,
//         extension_name: newFile.file.type,
//       },
//     });
//     return fileData;
//   } catch (error) {
//     throw new Error(`Failed to update file data: ${error}`);
//   }
// };

// /** S3 upload */
// export const addFileToS3 = async (fileData: FileDataInput): Promise<string> => {
//   const arrayBuffer = await fileData.file.arrayBuffer();
//   const fileBuffer = Buffer.from(arrayBuffer);

//   console.log("file type 확인", fileData.file.type);
//   const extName = fileData.file.type.split("/")[1];
//   const params = {
//     Bucket: Bucket,
//     Key: `${process.env.S3_UPLOAD_KEY}/${v1()}.${extName}`,
//     ContentType: fileData.file.type,
//     Body: fileBuffer,
//   };
//   try {
//     const command = new PutObjectCommand(params);
//     await s3.send(command);

//     return params.Key;
//   } catch (error) {
//     throw new Error(`Failed to upload to S3: ${error}`);
//   }
// };

// /** S3 파일 삭제 */
// export const deleteFileToS3 = async (key: string): Promise<S3Response> => {
//   const command = new DeleteObjectCommand({
//     Bucket: Bucket,
//     Key: key,
//   });

//   try {
//     const response = await s3.send(command);
//     return response;
//   } catch (error) {
//     throw new Error(`Failed to delete from S3: ${error}`);
//   }
// };

// /** S3 upload 파일 조회 */
// export const getFileDataFromS3 = async (key: string): Promise<string> => {
//   try {
//     const command = new GetObjectCommand({ Bucket: Bucket, Key: key });
//     const s3UploadFilePath = await getSignedUrl(s3, command, {
//       expiresIn: 3600,
//     });

//     const result = s3UploadFilePath.split("?")[0];
//     return result;
//   } catch (error) {
//     throw new Error(`Failed to get file from S3: ${error}`);
//   }
// };

// /** 등록 */
// export const addFile = async (
//   fileData: FileDataInput
// ): Promise<{ filePath: string; fileId: number }> => {
//   try {
//     // 1. s3 이미지 업로드
//     const s3UploadParamKey = await addFileToS3(fileData);
//     console.log("s3UploadParamKey", s3UploadParamKey);

//     // 1-1. s3 파일 조회 (file path)
//     const s3UploadFilePath = await getFileDataFromS3(s3UploadParamKey);
//     console.log("s3UPloadFilePath", s3UploadFilePath);

//     const newFileData = {
//       filePath: s3UploadFilePath,
//       paramKey: s3UploadParamKey,
//       file: fileData.file,
//     };

//     // 3. 이미지 데이터 파일 관리 테이블에 insert
//     // 파일 관리 테이블 insert
//     const result: FileRecord = await addFileData(newFileData);
//     console.log("파일 add data 확인", result);

//     const newFileInfo = {
//       filePath: result.file_path,
//       fileId: result.id,
//     };
//     return newFileInfo;
//   } catch (error) {
//     throw new Error(`Failed to add file: ${error}`);
//   }
// };

// /** 수정 */
// export const setFile = async (
//   originFileId: number,
//   fileData: FileDataInput
// ): Promise<string> => {
//   try {
//     // 1. s3 이미지 업로드
//     const s3UploadParamKey = await addFileToS3(fileData);
//     console.log("s3UploadParamKey", s3UploadParamKey);

//     // 1-1. s3 파일 조회 (file path)
//     const s3UploadFilePath = await getFileDataFromS3(s3UploadParamKey);
//     console.log("s3UPloadFilePath", s3UploadFilePath);

//     const addFileData = {
//       filePath: s3UploadFilePath,
//       paramKey: s3UploadParamKey,
//       file: fileData.file,
//     };

//     // 2. 기존 이미지 s3 파일 삭제
//     // 원본 파일 데이터 조회
//     const originFileData = await prisma.file.findUnique({
//       where: {
//         id: Number(originFileId),
//       },
//     });
//     if (originFileData) {
//       // 기존 이미지 s3 삭제
//       const s3DeleteFile = await deleteFileToS3(
//         originFileData.storage_file_name
//       );
//       console.log("s3 파일 삭제", s3DeleteFile);
//     }

//     // 3. 수정 이미지 데이터 파일 관리 테이블에 update
//     // 파일 관리 테이블 update
//     const result: FileRecord = await setFileData(
//       Number(originFileId),
//       addFileData
//     );
//     console.log("파일 update data 확인", result);

//     const newFilePath = result.file_path;
//     return newFilePath;
//   } catch (error) {
//     throw new Error(`Failed to update file: ${error}`);
//   }
// };

// /** 삭제 */
// export const deleteFile = async (fileId: number): Promise<boolean> => {
//   console.log("fileId 확인 =====>", fileId);
//   try {
//     // 파일 관리 테이블에서 삭제
//     const fileData = await prisma.file.delete({
//       where: {
//         id: Number(fileId),
//       },
//     });

//     // s3 에서 삭제
//     const result = await deleteFileToS3(fileData.storage_file_name);
//     await prisma.$disconnect();

//     if (result.$metadata.httpStatusCode === 204) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw new Error(`Failed to delete file: ${error}`);
//   }
// };
