export function useUpperCaseFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
};