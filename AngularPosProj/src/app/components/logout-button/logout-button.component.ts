import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

/**
 * `LogoutButtonComponent` is a user interface component that allows users to sign out of the application.
 * It utilizes the `AuthService` from Auth0 to perform the logout operation, which will redirect the user
 * to a specified route after successfully logging out.
 *
 * @Component Decorator that marks a class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styles: []
})
export class LogoutButtonComponent implements OnInit {
  /**
   * Constructs the `LogoutButtonComponent`.
   *
   * @param auth The injected `AuthService` from Auth0 that handles the authentication operations.
   * @param doc A reference to the document object, injected using the `DOCUMENT` token from Angular's common package.
   */
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  /**
   * OnInit lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    // Lifecycle hook implementation goes here.
  }

  /**
   * Initiates the logout process using Auth0's `AuthService`.
   * Upon calling `logout`, the user is redirected to the origin of the application, effectively logging them out.
   */
  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
