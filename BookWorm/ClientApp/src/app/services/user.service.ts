import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'https://localhost:44390/api/appusers';

    isLoggedInSubject: Subject<boolean> = new Subject();

    constructor(private http: HttpClient) { }

    register(formModel) {
        let body = {
            UserName: formModel.value.userName,
            Email: formModel.value.email,
            FullName: formModel.value.fullName,
            Password: formModel.value.passwords.password
        };

        return this.http.post(this.url + '/register', body);
    }

    login(formModel) {
        return this.http.post(this.url + '/login', formModel);
    }

    isLoggedIn(val: boolean) {
        this.isLoggedInSubject.next(val);
    }

    get currentUser() {
        let token = localStorage.getItem('token');

        if (!token)
          return null;

        return new JwtHelperService().decodeToken(token);
    }
}
