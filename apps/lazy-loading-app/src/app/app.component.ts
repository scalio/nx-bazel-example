import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ISignedUser } from '@proto-interface';

import { AuthenticationService } from './auth/authentication.service';

@Component({ selector: 'lazy-root', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: Required<ISignedUser>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe((x) => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
