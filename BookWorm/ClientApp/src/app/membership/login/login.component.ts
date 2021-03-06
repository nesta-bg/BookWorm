import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }

  login() {
    return this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          this.userService.isLoggedIn(true);
          this.loginForm.markAsPristine();
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
          this.toastr.success('User logged-in!', 'Login successful.');
        }
      },
      err => {
        if (err.status === 400)
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        else
          throw err;
      }
    );
  }

}
