import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const Region = process.env.NEXT_PUBLIC_AWS_REGION;
const AccessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const SecretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const credentials = {
  accessKeyId: AccessKeyId,
  secretAccessKey: SecretAccessKey,
};
export async function POST(request) {
  try {
    const formData = await request.formData();
    const user = await formData.get("user");
    const file = await formData.get("file");
    const imageName = `users/draft-${user}-${Date.now()}.jpg`;
    if (!file)
      return NextResponse.json({ error: "No file uploaded", status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadImageToS3(imageName, buffer);

    return NextResponse.json({
      status: 200,
      url: `https://${Bucket}.s3.amazonaws.com/${imageName}`,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Error uploading file", status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const url = request.nextUrl.searchParams.get("file").split("/");
    const responseCode = await deleteImageFromS3(`users/${url[url.length - 1]}`);
    if (responseCode >= 200 && responseCode < 300) {
      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ error: "Error deleting image in the bucket", status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Error deleting image", status: 400 });
  }
}

async function uploadImageToS3(fileName, file) {
  const s3 = new S3Client({
    region: Region,
    credentials: credentials,
  });
  const params = {
    Bucket: Bucket,
    Key: fileName,
    Body: file,
    ContentType: "image/jpg",
  };
  await s3.send(new PutObjectCommand(params));
}

async function deleteImageFromS3(fileName) {
  const s3 = new S3Client({
    region: Region,
    credentials: credentials,
  });
  const params = {
    Bucket: Bucket,
    Key: fileName,
    ContentType: "image/jpg",
  };
  const response = await s3.send(new DeleteObjectCommand(params));
  return response.$metadata.httpStatusCode
}
