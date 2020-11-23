import { Injectable } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router) { }

  canActivate() {
    let user = this.userService.currentUser;
    if (user && user.role === 'Admin')
      return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
