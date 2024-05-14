import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItem } from '../menu-view/menu-item.model';
import { HttpClient } from '@angular/common/http';
/**
 * `CartService` provides a service for managing the cart.
 * @Injectable Decorator that marks the class as available to be provided and injected as a dependency.
 * @root Specifies that the service should be provided in the root injector.
 * @OnInit Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
 * Define an ngOnInit() method to handle any additional initialization tasks.
 */
@Injectable({
    providedIn: 'root'
})
export class CartService {
  /**
   * BehaviorSubject for cart items.
   */
    private cartItemsSubject: BehaviorSubject<MenuItem[]>;
    /**
     * Observable for cart items.
     */
    cartItems$: Observable<MenuItem[]>;
  /**
   *  Constructor for `CartService`.
   * @param http HttpClient for making HTTP requests.
   */
  
    constructor(private http: HttpClient) {
      const savedCartItems = sessionStorage.getItem('cartItems');
      const initialCartItems = savedCartItems ? JSON.parse(savedCartItems) : [];
      this.cartItemsSubject = new BehaviorSubject<MenuItem[]>(initialCartItems);
      this.cartItems$ = this.cartItemsSubject.asObservable(); // Initialize after cartItemsSubject
    }
  
    private updateSessionStorage(items: MenuItem[]) {
      sessionStorage.setItem('cartItems', JSON.stringify(items));
    }
  
    addItem(item: MenuItem) {
      console.log("In the cart modal service: ");
      console.log(item);
      const currentItems = this.cartItemsSubject.value;
      const updatedItems = [...currentItems, item];
      this.cartItemsSubject.next(updatedItems);
      this.updateSessionStorage(updatedItems);
    }
  
    removeItem(index: number) {
      const currentItems = this.cartItemsSubject.value;
      currentItems.splice(index, 1);
      this.cartItemsSubject.next([...currentItems]);
      this.updateSessionStorage([...currentItems]);
    }
  
    updateItem(index: number, item: MenuItem) {
      const currentItems = this.cartItemsSubject.value;
      currentItems[index] = item;
      this.cartItemsSubject.next([...currentItems]);
      this.updateSessionStorage([...currentItems]);
    }
  
    getItem(index: number): MenuItem {
      const currentItems = this.cartItemsSubject.value;
      return currentItems[index];
    }
  
    clearCart() {
      this.cartItemsSubject.next([]);
      sessionStorage.removeItem('cartItems');
    }
  
    async confirmOrder(customerId: number, orderItems: any[], orderTotal: number): Promise<any> {
      try {
        // Update the URL to point to your backend server
        const response = await this.http.post('https://bonappetea.onrender.com/api/orders/confirmOrder', {
          customerId,
          orderItems,
          orderTotal
        }).toPromise();
        return response;
      } catch (error) {
        console.error('Error confirming order:', error);
        throw error;
      }
    }
  }
