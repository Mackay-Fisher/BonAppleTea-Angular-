import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

/**
 * `SignupButtonComponent` is a user interface component that triggers the sign-up process.
 * It leverages the `AuthService` from Auth0 to initiate a sign-up flow by providing a hint to the
 * Auth0 Universal Login page to show the sign-up tab.
 *
 * @Component Decorator that identifies the class as an Angular component and provides metadata about the component.
 */
@Component({
  selector: 'app-signup-button',
  templateUrl: './signup-button.component.html',
})
export class SignupButtonComponent implements OnInit {
  /**
   * Constructor for the `SignupButtonComponent`.
   * 
   * @param auth The `AuthService` from Auth0 injected to provide authentication functionality.
   */
  constructor(public auth: AuthService) {}

  /**
   * OnInit lifecycle hook that is called after Angular first displays the data-bound properties.
   * It is the place to put the initialization logic for the component.
   */
  ngOnInit(): void {
    // Initialization logic can go here.
  }

  /**
   * Calls the `loginWithRedirect` method from the `AuthService` and passes a configuration object
   * that includes the `screen_hint` set to 'signup'. This instructs Auth0 to redirect the user
   * to the signup page directly.
   */
  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ screen_hint: 'signup' });
  }
}
