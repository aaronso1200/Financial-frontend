import { AbstractControl } from '@angular/forms';

let password = null;
const specialChar = new RegExp('[^A-Za-z0-9]');
const upperChar = new RegExp('[A-Z]');
const lowerChar = new RegExp('[a-z]');
const userName = new RegExp('/^[a-z]/i');
const email = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export function passwordValidator(control: AbstractControl) {
 password = control.value;

 if (control.value) {
  if (control.value.length < 6) {
    return { minlength: true};
  }
  if (!specialChar.test(password)) {
    return {
      specialChar: true
    };
  }
  if (!upperChar.test(password)) {
    return {
      upperChar: true
    };
  }
  if (!lowerChar.test(password)) {
    return {
      lowerChar: true
    };
  }
}
return null;
}

//
export function samePasswordValidator (control: AbstractControl) {
if (control.value) {
  if (control.value !== password) {
    // console.log(control.value, password);
  return {difference: true};
  }
}
return null;
}

export function emailValidator (control: AbstractControl) {
  if (control.value) {
    console.log(control.value);
    if (!email.test(control.value)) {
      return {typeError: true};
    }
  }
}

export function loginNameValidator(control: AbstractControl) {
  if (control.value) {
    if (control.value.length < 3 ) {
      return { minlength: true};
    }
    if (specialChar.test(control.value)) {
      return {specialChar: true};
    }

    if (userName.test(control.value)) {
      return {startChar: true}
    }
}
}
