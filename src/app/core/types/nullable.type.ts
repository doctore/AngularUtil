/**
 * Type that allows `null` values.
 */
export type Nullable<T> = T | null;

/**
 * Type that allows `undefined` values.
 */
export type OrUndefined<T> = T | undefined;

/**
 * Type that allows `undefined` and `null` values.
 */
export type NullableOrUndefined<T> = T | null | undefined;

/**
 * Type that allows `undefined` and `null` {@link String} or {@link Number} values
 */
export type NullableOrUndefinedStringNumber = string | number | null | undefined;

