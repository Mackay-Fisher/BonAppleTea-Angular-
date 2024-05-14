import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * `ActiveComponentService` manages the state of the currently active component in the application.
 * It uses a BehaviorSubject to track and update the active component's name.
 */
@Injectable({
  providedIn: 'root'
})
export class ActiveComponentService {
  /**
   * The currently active component.
   */
  private activeComponentSource = new BehaviorSubject<string>('');
  /**
   * The currently active component as an Observable.
   */
  activeComponent = this.activeComponentSource.asObservable();

  /**
   * Sets the currently active component.
   * 
   * @param componentName The name of the component to be set as active.
   */
  setActiveComponent(componentName: string) {
    this.activeComponentSource.next(componentName);
  }
}
