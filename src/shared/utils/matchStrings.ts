export function matchStrings(string: string, array: string[]) {
  for (const single of array) {
    if (string.match(single)) return true;
  }

  return false;
}
