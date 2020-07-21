import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISignedUser, ISignUpDto } from '@proto-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Required<ISignedUser>>;
    public currentUser: Observable<Required<ISignedUser>>;
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<Required<ISignedUser>>(
          JSON.parse(localStorage.getItem('currentUser')),
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Required<ISignedUser> {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<Required<ISignedUser>>(`${this.apiUrl}/auth/sign-in`, { username, password })
            .pipe(map((user) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ ...user, username }));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    register(user: Required<ISignUpDto>) {
      return this.http.post(`${this.apiUrl}/auth/sign-up`, user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
