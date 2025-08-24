export function slugify(value: string) {
  return value
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-');
}
