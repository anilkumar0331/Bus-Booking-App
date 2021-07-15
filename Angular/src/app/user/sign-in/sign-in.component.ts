import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  serverErrMsg: string;

  // Form

  signinForm: FormGroup;

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  // GETTERS

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  //Custom Functions

  onSubmit(form: FormGroup) {
    this.userService.login(form.value).subscribe(
      (res) => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/bookseat');
      },
      (err) => {
        this.serverErrMsg = err.error.message;
        setTimeout(() => (this.serverErrMsg = ''), 3000);
      }
    );
  }
}
