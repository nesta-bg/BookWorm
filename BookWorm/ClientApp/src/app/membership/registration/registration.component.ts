import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
  this.registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(35)]],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required, Validators.maxLength(15)]],
    passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });
}

get username() {
  return this.registerForm.get('userName');
}
get fullname() {
  return this.registerForm.get('fullName');
}
get email() {
  return this.registerForm.get('email');
}
get password() {
  return this.registerForm.get('passwords.password');
}
get confirmpassword() {
  return this.registerForm.get('passwords.confirmPassword');
}

comparePasswords(fb: FormGroup) {
  const confirmPswrdCtrl = fb.get('confirmPassword');
  // passwordMismatch
  // confirmPswrdCtrl.errors={passwordMismatch:true}
  if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
    if (fb.get('password').value !== confirmPswrdCtrl.value)
      confirmPswrdCtrl.setErrors({ passwordMismatch: true });
    else
      confirmPswrdCtrl.setErrors(null);
  }
}

register() {
  this.userService.register(this.registerForm).subscribe(
    (res: any) => {
      if (res.succeeded) {
        this.registerForm.markAsPristine();
        this.router.navigate(['']);
        this.toastr.success('New user created!', 'Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken', 'Registration failed.');
              break;

            default:
              this.toastr.error(element.description, 'Registration failed.');
              break;
          }
        });
      }
    },
    err => {
      throw err;
    }
  );
}

}
