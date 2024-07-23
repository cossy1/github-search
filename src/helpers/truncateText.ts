export function truncateText(str: string, length: number) {
  if (str.length > length && str.length > 0) {
    return str.substring(0, length) + "...";
  }
  return str;
}
