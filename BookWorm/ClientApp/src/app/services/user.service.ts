import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'https://localhost:44390/api/appusers';

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
}
