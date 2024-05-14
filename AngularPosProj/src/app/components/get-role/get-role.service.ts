import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employees } from 'src/app/models/employees';
/**
 * `DataService` provides a service for fetching data from the backend.
 * It enables the selection of item types, ingredients, and creation of new menu items.
 * @Injectable Decorator that marks the class as available to be provided and injected as a dependency.
 * @root Specifies that the service should be provided in the root injector.
 * @OnInit Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
 * Define an ngOnInit() method to handle any additional initialization tasks.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  /**
   * Boolean to track if the current user is a manager.
   */
  currentUserIsManager: boolean = false;
  /**
   * Boolean to track if the current user is a cashier.
   */
  currentUserIsCashier: boolean = false;
    /**
   * Constructor for `DataService`.
   * 
   * @param http HttpClient for making HTTP requests.
   * @param auth AuthService for authentication-related functionalities.
   */
  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) {}
    /**
     * OnInit lifecycle hook to check if the current user is a manager.
     * If the current user is not a manager, check if they are a cashier.
     */
  ngOnInit(): void {
    this.auth.user$.subscribe(
      user => {

          console.log(user);

          if (user) {
            this.checkIfUserIsManager(user);
            if (!this.currentUserIsManager) {
              this.checkIfUserIsCashier(user);
            }
        }
      }
    )
  }
  /**
   * Method to fetch data from the backend.
   * @returns Observable of type Employees[].
   */
  getData(): Observable<Employees[]> {
    return this.http.get<Employees[]>('https://bonappetea.onrender.com/api/employees');
  }
  /**
   * Method to fetch data from the backend.
   * @returns Observable of type Employees[].
   */
  isManager(): Observable<Employees[]> {
    return this.getData().pipe(
      map(employees => employees.filter(employee => 
        employee.position === 'Manager' || 
        employee.position === 'CFO' || 
        employee.position === 'CEO'
        ))
    );
  }
  /**
   *  Method to fetch data from the backend.
   * @param user 
   */
  public checkIfUserIsCashier(user: any): void {
    this.getData().subscribe(employees => {

      console.log("checking for cashier status");
      console.log(user.first_name);
      console.log(user.last_name);

      // Find the employee in the list that matches the user's first and last name
      const matchingEmployee = employees.find(employee =>
        employee.first_name === user.given_name && employee.last_name === user.family_name);
  
      // Check if the matching employee's position is 'Cashier'
      this.currentUserIsCashier = matchingEmployee ? (
        matchingEmployee.position === 'Cashier') : false;
    });
  }
  /**
   *  Method to fetch data from the backend.
   * @param user 
   */
  public checkIfUserIsManager(user: any): void {
    this.getData().subscribe(employees => {
      // Logging for debugging
      console.log('User:', user);
      console.log('Employees:', employees);
  
      // Find the employee in the list that matches the user's first and last name
      const matchingEmployee = employees.find(employee =>
        employee.first_name === user.given_name && employee.last_name === user.family_name);
  
      // Logging the matching employee for debugging
      console.log('Matching Employee:', matchingEmployee);
  
      // Check if the matching employee's position is 'Manager', 'CEO', or 'CFO'
      this.currentUserIsManager = matchingEmployee ? (
        matchingEmployee.position === 'CEO' || 
        matchingEmployee.position === 'CFO' ||
        matchingEmployee.position === 'Manager') : false;
  
      // Logging the final result for debugging
      console.log('Is User a Manager/CEO/CFO:', this.currentUserIsManager);
      this.currentUserIsCashier = this.currentUserIsManager;
    });
  }
  
  

  // isManager(user: Employees): boolean {
  //   return user.position === 'Manager' || user.position === 'CFO' || user.position === 'CEO';
  // }

  /**
   * Method to fetch data from the backend.
   * @returns Observable of type Employees[].
   */
  isCashier(): Observable<Employees[]> {
    return this.getData().pipe(
      map(employees => employees.filter(employee => 
        employee.position === 'Cashier'
        ))
    );
  }
}
