import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * `ConfirmationPopupComponent` is a reusable UI component that displays a confirmation dialog to the user.
 * It can be used to confirm actions like edit, delete, or add operations. This component emits events based on the user's choice.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the selector, template, and styles.
 */
@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent {
  /**
   * Input property to receive the item that is subject to confirmation.
   */
  @Input() item: any;

  /**
   * Output event emitter that fires when the user confirms the action.
   */
  @Output() confirm = new EventEmitter<void>();

  /**
   * Output event emitter that fires when the user declines the action.
   */
  @Output() decline = new EventEmitter<any>();

  /**
   * Input property to specify the current action type like 'edit', 'delete', or 'add'.
   */
  @Input() currentAction: 'edit' | 'delete' | 'add' | null = null;

  /**
   * Emits the `confirm` event, indicating the action has been confirmed by the user.
   */
  confirmAction(): void {
    this.confirm.emit(this.item);
  }
  
  /**
   * Emits the `decline` event, indicating the user has declined the action.
   */
  declineAction(): void {
    this.decline.emit();
  }
}
