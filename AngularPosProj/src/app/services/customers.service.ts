import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `CustomersService` handles HTTP requests related to customer data.
 * It communicates with a specified API endpoint to perform CRUD operations.
 */
@Injectable({ providedIn: 'root' })
export class CustomersService {
  /**
   * The base URL for the customer API.
   */
  private baseUrl = `https://bonappetea.onrender.com/api/customers`;
  /**
   * Constructor for `CustomersService`.
   * @param http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of customers from the API.
   * @returns An Observable of customer data.
   */
  getCustomers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
