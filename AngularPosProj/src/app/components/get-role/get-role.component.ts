import { Component, OnInit } from '@angular/core';
import { DataService } from './get-role.service';
import { AuthService } from '@auth0/auth0-angular';

/**
 * `GetRoleComponent` manages the role-based access within the application.
 * It subscribes to the DataService to determine whether the current user
 * has a role of a cashier or a manager, which in turn controls the accessibility
 * of certain UI tabs based on the user's role.
 *
 * @Component Decorator that marks a class as an Angular component and provides configuration metadata that determines how the component should be processed, instantiated, and used at runtime.
 */
@Component({
  selector: 'app-get-role',
  templateUrl: './get-role.component.html',
  styleUrls: ['./get-role.component.scss']
})
export class GetRoleComponent implements OnInit {

  /**
   * The constructor for `GetRoleComponent`.
   * It injects `DataService` for fetching user roles.
   *
   * @param dataService Service for obtaining user roles and permissions.
   */
  constructor(private dataService: DataService) {}

  /**
   * OnInit lifecycle hook to perform component initialization.
   * Here it subscribes to the `isManager` observable from `DataService`
   * to check the user's role and log it to the console.
   */
  ngOnInit(): void {
    this.dataService.isManager().subscribe(data => {
      // Log the data received from the isManager subscription
      console.log(data);
    });
  }
}

