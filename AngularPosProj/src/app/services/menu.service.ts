import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `MenuService` provides HTTP methods for CRUD operations on menu items.
 */
@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = `https://bonappetea.onrender.com/api/menu`;

  constructor(private http: HttpClient) {}

  // Methods: getMenu, getMenuByType, getMenuItemByName, deleteMenuItem, editMenuItem, addMenuItem, getMenuItemTypes, getMenuItemById
  /**
   *  Method to get the menu.
   * @returns Observable of type any.
   */
  getMenu(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
/**
 * Method to get the menu by type.
 * @param type 
 * @returns Observable of type any.
 */
  getMenuByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}`);
  }
  /**
   * Method to get the menu item by name.
   * @param name 
   * @param type 
   * @returns  Observable of type any.
   */
  getMenuItemByName(name:string, type:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${type}/${name}`);
  }
  /**
   * Method to delete a menu item.
   * @param id 
   * @returns  Observable of type any.
   */
  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
/**
 * Method to edit a menu item.
 * @param id 
 * @param menuItem 
 * @returns  Observable of type any.
 */
  editMenuItem(id: number, menuItem: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, menuItem);
  }
/**
 * Method to add a menu item.
 * @param menuItem 
 * @returns 
 */
  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, menuItem);
  }
/**
 * Method to get the menu item types.
 * @returns Observable of type any.
 */
  getMenuItemTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/menu/item/types`);
  }
/**
 *  Method to get the menu item by id.
 * @param id 
 * @returns  Observable of type any.
 */
  getMenuItemById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/by/${id}`);
  }

  /**
 *  Method to get the menu item stock by name
 * @param name
 * @returns  Observable of type any.
 */
  findItemQuantity(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
}
