// In inventory.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `InventoryService` handles operations related to inventory management, including fetching, adding, editing, and deleting inventory items.
 */
@Injectable({ providedIn: 'root' })
export class InventoryService {
  /**
   * The base URL for the inventory API.
   */
  private baseUrl = `https://bonappetea.onrender.com/api/inventory`;
  /**
   * Constructor for `InventoryService`.
   * @param http The HttpClient module to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  // Methods for getInventory, deleteInventoryItem, editInventoryItem, addInventoryItem, getItemById
/**
 * Method to get inventory.
 * @returns Observable of type any.
 */
  getInventory(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
/**
 * Method to delete inventory item.
 * @param id 
 * @returns Observable of type any.
 */
  deleteInventoryItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
/**
 * Method to edit inventory item.
 * @param id 
 * @param inventoryItem 
 * @returns Observable of type any.
 */
  editInventoryItem(id: number, inventoryItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, inventoryItem);
  }
/**
 * Method to add inventory item.
 * @param inventoryItem 
 * @returns Observable of type any.
 */
  addInventoryItem(inventoryItem: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, inventoryItem);
  }
/**
 * Method to get item by id.
 * @param id 
 * @returns Observable of type any.
 */
  getItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
