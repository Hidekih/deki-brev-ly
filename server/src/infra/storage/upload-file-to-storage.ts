import { Readable } from 'node:stream';
import { createUniqueFileName } from '@/app/helpers/createUniqueFileName';
import { env } from '@/config/env';
import { Upload } from '@aws-sdk/lib-storage';
import { z } from 'zod';
import { r2 } from './client';

const uploadFileToStorageInput = z.object({
  folder: z.enum(['reports']),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>;

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, fileName, contentType, contentStream } =
    uploadFileToStorageInput.parse(input);

  const uniqueFileName = createUniqueFileName(fileName);
  const fileKey = `${folder}/${uniqueFileName}`;

  const upload = new Upload({
    client: r2,
    params: {
      Key: fileKey,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: fileKey,
    url: new URL(fileKey, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
