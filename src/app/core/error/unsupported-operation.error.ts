/**
 * Thrown to indicate that a method has received an illegal or inappropriate argument.
 */
export class UnsupportedOperationError extends Error {

  constructor(m: string) {
    super(m);
    this.name = 'UnsupportedOperationError';
    Object.setPrototypeOf(this, UnsupportedOperationError.prototype);
  }

}
