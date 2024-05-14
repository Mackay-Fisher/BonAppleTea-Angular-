import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

/**
 * `LoginButtonComponent` serves as a user interface component that triggers the authentication process.
 * It uses the `AuthService` from Auth0 to initiate a login flow which redirects the user to the Auth0 hosted login page.
 *
 * @Component Decorator that marks a class as an Angular component, specifies metadata about the component including its selector, template, and styles.
 */
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styles: []
})
export class LoginButtonComponent implements OnInit {
  /**
   * The constructor for `LoginButtonComponent`.
   * 
   * @param auth The injected `AuthService` from Auth0 that provides authentication functionality.
   */
  constructor(public auth: AuthService) {}

  /**
   * OnInit lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    // Lifecycle hook implementation goes here
  }

  /**
   * Calls the `loginWithRedirect` method from Auth0's `AuthService` to start the login process.
   * This method redirects the user to the Auth0 Universal Login page.
   */
  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}
