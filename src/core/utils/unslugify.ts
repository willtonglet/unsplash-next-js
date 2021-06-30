export function unslugify(str: string): string {
  return String(str).split('-').join(' ');
}
