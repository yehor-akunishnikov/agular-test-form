import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Hobby } from '../models/Hobby';

export const hobbyValidatorWrapper = (hobbys: Hobby[]): ValidatorFn => {
  return (form: AbstractControl): ValidationErrors | null => {

    if(!hobbys.length) {
      form.setErrors({noHobbys: true});
      return {noHobbys: true};
    }
    return null;
  };
}