import s from 'slugify';

export function slugify(str: string): string {
  return s(str);
}
