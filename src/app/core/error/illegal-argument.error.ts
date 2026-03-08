/**
 * Thrown to indicate that a method has received an illegal or inappropriate argument.
 */
export class IllegalArgumentError extends Error {

  constructor(m: string) {
    super(m);
    this.name = 'IllegalArgumentError';
    Object.setPrototypeOf(this, IllegalArgumentError.prototype);
  }

}
