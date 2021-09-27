import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { delay } from 'rxjs/operators'

export const EmailValidator = (form: AbstractControl): Observable<ValidationErrors | null> => {
  const email: string | null = form?.value;
  const checkResult$: Observable<ValidationErrors | null>  = new Observable((sub) => {
    sub.next(email === 'test@test.test' ? {emailExists: true} : null);
    sub.complete();
  });

  return checkResult$.pipe(delay(2000));
};