import * as _ from 'lodash';
import { Nullable } from '@app-core/types';

/**
 * Defines global properties and methods that different declared classes can use as parent one.
 */
export abstract class BaseObject {

  /**
   * Returns {@code true} if the current instance is equals to {@code other}, {@link false} otherwise.
   *
   * @param other
   *    Instance to compare with the current one.
   *
   * @return {@code true} if current instance is equal to {@code other},
   *         {@code false} otherwise.
   */
  equals = (other?: Nullable<any>): boolean =>
    _.isNil(other)
      ? false
      : _.isEqual(this, other);

}
