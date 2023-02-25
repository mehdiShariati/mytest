import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
})
export class NumberValidatorDirective {
  static forbiddenNameValidator(formcontrol: FormControl): {
    hasLower: boolean;
    hasNumber: boolean;
    hasUpper: boolean;
    static: boolean;
  } {
    const hasNumber = /\d/.test(formcontrol.value);
    const hasUpper = /[A-Z]/.test(formcontrol.value);
    const hasLower = /[a-z]/.test(formcontrol.value);

    return { hasUpper: !hasUpper, hasNumber: !hasNumber, hasLower: !hasLower, static: true };
  }
}
