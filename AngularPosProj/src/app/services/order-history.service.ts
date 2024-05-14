import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `OrderHistoryService` manages order history data, providing methods to retrieve and manipulate it.
 */
@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  /**
   * The base URL for the order history API.
   */
  private baseUrl = `https://bonappetea.onrender.com/api/order-history`;
  /**
   * Constructor for `OrderHistoryService`.
   * @param http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  // Methods: getOrderHistory, getIngredients, getIng

  /**
   * Method to get order history.
   * @returns Observable of type any.
   */
  getOrderHistory(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  /**
   * Method to get ingredients.
   * @returns Observable of type any.
   */
  getIngridents(): Observable<any> {
    return this.http.get(this.baseUrl+"/ingredients");
  }
  /**
   * Method to get ingredients.
   * @returns Observable of type any.
   */
  getIng(): Observable<any> {
    return this.http.get(this.baseUrl+"/ogIn");
  }

}
