/**
 * Function to remove empty string values from an object
 */
export const removeEmptyStrings = <T extends Record<string, any>, K extends readonly (keyof T)[]>(
  obj: T,
  preserveAsUndefined: K = [] as unknown as K,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        if (value !== '') {
          return [key, value] as const;
        }

        if (preserveAsUndefined.includes(key as keyof T)) {
          return [key, null] as const;
        }

        return null;
      })
      .filter((entry) => entry !== null),
  ) as Partial<T>;
};
