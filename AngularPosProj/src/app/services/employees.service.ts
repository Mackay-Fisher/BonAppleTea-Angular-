import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `EmployeesService` manages interactions with the API for employee-related data.
 */
@Injectable({ providedIn: 'root' })
export class EmployeesService {
  /**
   * The base URL for the employee API.
   */
  private baseUrl = `https://bonappetea.onrender.com/api/employees`;
  /**
   * Constructor for `EmployeesService`.
   * @param http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches employee data from the API.
   * @returns An Observable containing the list of employees.
   */
  getEmployees(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
