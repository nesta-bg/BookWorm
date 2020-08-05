import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user;

  constructor(private userService: UserService) {
    this.user = this.userService.currentUser;
  }

  ngOnInit() {
    this.userService.isLoggedInSubject.subscribe(status => {
      if (status) {
        this.user = this.userService.currentUser;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
  }

}
