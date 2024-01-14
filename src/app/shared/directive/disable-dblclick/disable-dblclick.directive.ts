import { Directive, HostListener, Input } from '@angular/core';

/**
 * Directive to disable temporarily the double click events in required DOM elements. Examples:
 * <p>
 * Without sending any input parameter (their default values will be used):
 *
 * ```html
 * <input
 *    disableDblClick
 * ```
 * <p>
 * With a value for `disableIf` input parameter different that default one:
 *
 * ```html
 * <input
 *    disableDblClick [disableIf]="myFunctionToDisableOrNot(...)"
 * ```
 */
@Directive({
  selector: '[disableDblClick]',
  standalone: true,
})
export class DisableDblClickDirective {

  @Input() disableIf: boolean = true;

  /**
   * In milliseconds. It only will be used if {@link DisableDblClickDirective#disableIf} is `true`.
   */
  @Input() disableTimeout: number = 500;


  constructor() { }


  @HostListener('click', ['$event'])
  clickEvent(event: any) {
    if (event && event.target && this.disableIf) {
      event.target.setAttribute('disabled', true);
      setTimeout(
        function () {
          event.target.removeAttribute('disabled');
        },
        this.disableTimeout
      );
    }
  }

}
