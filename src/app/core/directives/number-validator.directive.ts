import {Directive} from '@angular/core';
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[appNumberValidator]',

})
export class NumberValidatorDirective {

  static forbiddenNameValidator(formcontrol: FormControl): { hasLower: boolean; hasNumber: boolean; hasUpper: boolean } | null {
    const hasNumber = /\d/.test(formcontrol.value);
    const hasUpper = /[A-Z]/.test(formcontrol.value);
    const hasLower = /[a-z]/.test(formcontrol.value);

    let errors = {
      hasUpper: true,
      hasNumber: true,
      hasLower: true
    }

    if (hasNumber) {
      errors.hasNumber = false;
    }

    if (hasUpper) {
      errors.hasUpper = false;
    }

    if (hasLower) {
      errors.hasLower = false;
    }

    let forbidden = !hasUpper || !hasLower || !hasNumber;
    return forbidden ? errors : null;

  }
}

