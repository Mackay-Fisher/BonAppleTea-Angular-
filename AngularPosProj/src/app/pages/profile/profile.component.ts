import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

/**
 * `ProfileComponent` is responsible for displaying the user's profile information.
 * It retrieves the user's profile data from Auth0's user$ observable and presents it.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector and template.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileJson: string = "";

  /**
   * Constructor for `ProfileComponent`.
   * 
   * @param auth Service for Auth0 authentication that provides user profile data.
   */
  constructor(public auth: AuthService) {}

  /**
   * OnInit lifecycle hook to subscribe to the user's profile data from Auth0 and format it for display.
   */
  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => {
        this.profileJson = JSON.stringify(profile, null, 2);
        console.log(profile?.given_name);
      }
    );
  }
}
