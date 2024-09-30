import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms'

@Directive({
  selector: '[appNumerosEcuadorPhone]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumerosEcuadorPhoneDirective),
      multi: true
    }
  ]
})
export class NumerosEcuadorPhoneDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    const phone = control.value;

    if (!phone) {
      return null;
    }

    const phoneRegex = /^(?:(?:\+|00)593|0)\s*(?:[2-7]|9[2-9])\s*(?:\d\s*){7}$/;

    if (!phoneRegex.test(phone)) {
      return { 'ecuadorianPhone': true };
    }

    return null;
  }

}
