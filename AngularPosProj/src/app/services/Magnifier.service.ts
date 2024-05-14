import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * `MagnifierService` manages the state of a magnifier feature in the application.
 * It allows toggling the magnifier on and off and provides access to its current state.
 */
@Injectable({
  providedIn: 'root',
})
export class MagnifierService {
  /**
   * The current state of the magnifier.
   */
  private magnifierState = new BehaviorSubject<boolean>(false);
  private screenflipState = new BehaviorSubject<boolean>(false);
  private screenState = new BehaviorSubject<boolean>(false);

  /**
   * Toggles the magnifier's state between on and off.
   */
  toggleMagnifier(): void {
    this.magnifierState.next(!this.magnifierState.value);
  }

  toggleScreenflip(): void {
    this.screenflipState.next(!this.screenflipState.value);
  }

  getToggleScreenflip() {
    return this.screenflipState.asObservable();
  }

  togglestartScreenflip() {
    this.screenState.next(!this.screenState.value);
  }
  getTogglestartScreenflip() {
    return this.screenState.asObservable();
  }
  /**
   * Returns an observable for the current state of the magnifier.
   */
  getMagnifierState() {
    return this.magnifierState.asObservable();
  }
}
