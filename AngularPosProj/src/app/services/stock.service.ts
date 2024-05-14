import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `MenuService` provides HTTP methods for CRUD operations on menu items.
 */
@Injectable({ providedIn: 'root' })
export class StockService {
  private baseUrl = `https://bonappetea.onrender.com/api/stock`;

  constructor(private http: HttpClient) {}

  // Methods: updateQuantity, findQuantity
/**
 * Method to edit a menu item.
 * @param itemName
 * @returns  Observable of type any.
 */
  updateQuantity(itemName: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${itemName}`, {});
  }

  /**
 *  Method to get the item stock by name
 * @param name
 * @returns  Observable of type any.
 */
  findQuantity(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
}