/**
 *    Equivalent type of enum in TypeScript. This is necessary because, although it is an option in the language,
 * internally it is not a real data type.
 */
export type EnumLike = Record<string, string | number>;


/**
 * Type to define the allowed values of the enum equivalent in TypeScript.
 */
export type EnumValues<E extends EnumLike> = E[keyof E];
