// import { Directive } from '@angular/core';
// import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
// import { Observable, timer } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import { AuthService } from './../auth.service';


// export function existingUsernameValidator(authService: AuthService): AsyncValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     const timers = timer(2000, 1000) //milliseconds
//     return timers.pipe(switchMap(()=> {
//       return authService.getUserByUsername(control.value).pipe(map(
//         users => {
//           return (users && users.length > 0) ? {'usernameExists': true} : null;
//         }
//       ));
//     }));
//   };
// }

// @Directive({
//   selector: '[usernameExists][formControlName],[usernameExists][formControl],[usernameExists][ngModel]',
//   providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
// })
// export class ExistingUsernameValidatorDirective implements AsyncValidator {
//   constructor(private authService: AuthService) {  }

//   validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     return existingUsernameValidator(this.authService)(control);
//   }
// }
