/**
 *    Equivalent type of enum in TypeScript. This is necessary because, although it is an option in the language,
 * internally it is not a real data type.
 */
export type EnumLike = Record<string, string | number>;


/**
 * Type to define the allowed values of the enum equivalent in TypeScript.
 */
export type EnumValues<E extends EnumLike> = E[keyof E];


/**
 * Type-level representation of `unzip`.
 *
 * Converts a tuple of value types into a tuple of arrays containing those values.
 *
 * @example
 *   [A, B, C] -> [A[], B[], C[]]
 */
export type UnzipTuple<T extends unknown[]> = {
  [K in keyof T]: T[K][];
};


/**
 * Type-level representation of `zip`.
 *
 * Converts a tuple of arrays into a tuple of the arrays' element types.
 *
 * @example
 *   [A[], B[], C[]] -> [A, B, C]
 */
export type ZipTuple<T extends unknown[]> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? U
    : never;
};
