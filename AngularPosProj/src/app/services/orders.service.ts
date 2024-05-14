// In orders.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
/**
 * `OrdersService` handles operations related to orders, including fetching, updating order history, and managing inventory.
 */
@Injectable({ providedIn: 'root' })
export class OrdersService {
  /**
   * Base URL for HTTP requests.
   */
  private baseUrl = `${environment.apiUrl}/orders`;
  /**
   * URL for updating order history.
   */
  private orderHistoryUrl = 'https://bonappetea.onrender.com/api/order-history/create';
  /**
   * URL for updating inventory.
   */
  private inventoryUpdateUrl = 'https://bonappetea.onrender.com/api/inventory/update';
  /**
   * Constructor for `OrdersService`.
   * @param http HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) { }
  /**
   * Method to get orders.
   * @returns Observable of type any.
   */
  getOrders(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  /**
   * Method to get order by id.
   * @param orderItems 
   * @param orderTotal 
   * @param employeeId 
   * @param customerId 
   * @returns Observable of type any.
   */
  updateOrderHistory(orderItems: any[], orderTotal: number, employeeId: number, customerId: number) {
    /**
     * Order data to be sent to the server.
     */
    const orderData = {
      /**
       * Order items.
       */
      order_items: orderItems,
      /**
       * Order total.
       */
      order_total: orderTotal,
      /**
       * Employee ID.
       */
      employee_id: employeeId,
      /**
       * Customer ID.
       */
      customer_id: customerId
    };

    return this.http.post(this.orderHistoryUrl, orderData);
  }
  /**
   * Method to update inventory.
   * @param itemName 
   * @param quantity 
   * @returns Observable of type any.
   */
  updateInventory(itemName: string, quantity: number) {
    const inventoryData = {
      item_name: itemName,
      item_quantity: quantity
    };

    return this.http.put(this.inventoryUpdateUrl, inventoryData);
  }
}
