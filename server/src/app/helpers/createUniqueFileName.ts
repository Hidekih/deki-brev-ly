import { basename, extname } from 'node:path';
import { slugify } from '@/app/helpers/slugify';
import { v7 as uuidv7 } from 'uuid';

export const createUniqueFileName = (originalFileName: string) => {
  const fileExtension = extname(originalFileName);
  const fileNameWithoutExtension = basename(originalFileName);
  const fileNameAsSlug = slugify(fileNameWithoutExtension);

  const fileNameWithLimitedSize = fileNameAsSlug.substring(0, 180);
  const sanitizedFileNameWithExtension =
    fileNameWithLimitedSize.concat(fileExtension);

  return `${uuidv7()}-${sanitizedFileNameWithExtension}`;
};
