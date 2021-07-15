import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private userService: UserService) {}

  showSuccessMsg: boolean;
  serverErrMsg: string;

  // Regex Patterns

  namePattern = '^[a-zA-Z ]*$';
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobileNumPattern = '^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
  pwPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}';

  // FormGroup

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.namePattern),
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      mobileNumber: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.mobileNumPattern),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.pwPattern),
      ]),
      dob: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });
  }

  // GETTERS

  get fullName() {
    return this.signupForm.get('fullName');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get mobileNumber() {
    return this.signupForm.get('mobileNumber');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get dob() {
    return this.signupForm.get('dob');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  // Custom Functions

  onSubmit(form: FormGroup) {
    this.userService.postUser(form.value).subscribe(
      (res) => {
        this.showSuccessMsg = true;
        setTimeout(() => (this.showSuccessMsg = false), 3000);
      },
      (err) => {
        if (err.status === 422) {
          this.serverErrMsg = err.error.join('<br/>');
          setTimeout(() => (this.serverErrMsg = ''), 3000);
        } else {
          this.serverErrMsg = 'Something went wrong,Please check it';
        }
      }
    );

    setTimeout(() => this.signupForm.reset(), 4000);
  }
}
