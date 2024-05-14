// In ingredients.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/**
 * `IngredientsService` provides functionality to manage ingredient data through HTTP requests.
 */
@Injectable({ providedIn: 'root' })
export class IngredientsService {
  private baseUrl = `https://bonappetea.onrender.com/api/ingredients`;
/**
 * Constructor for `IngredientsService`.
 * @param http HttpClient for making HTTP requests.
 */
  constructor(private http: HttpClient) {}

  // Methods for getIngredients, deleteIngredient, editIngredient, addIngredient, getIngredientNames, getIngredientById
/**
 * Method to get ingredients.
 * @returns Observable of type any.
 */
  getIngredients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
/**
 * Method to delete an ingredient.
 * @param id 
 * @returns Observable of type any.
 */
  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
/**
 *  Method to edit an ingredient.
 * @param id 
 * @param ingredient 
 * @returns  Observable of type any.
 */
  editIngredient(id: number, ingredient: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, ingredient);
  }
/**
 * Method to add an ingredient.
 * @param ingredient 
 * @returns Observable of type any.
 */
  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, ingredient);
  }
/**
 * Method to get ingredient names.
 * @returns Observable of type any.
 */
  getIngredientNames(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ingredientNames`);
  }
/**
 * Method to get ingredient by id.
 * @param id 
 * @returns  Observable of type any.
 */
  getIngredientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/by/${id}`);
  }
}
