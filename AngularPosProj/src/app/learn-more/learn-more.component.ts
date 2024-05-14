import { Component } from '@angular/core';

/**
 * `LearnMoreComponent` provides a view for users to access additional information about the application or service.
 * This component typically includes detailed descriptions, features, and other relevant content to help users understand more about what is offered.
 *
 * @Component Decorator that marks the class as an Angular component, specifying the metadata like the selector, template, and styles.
 */
@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.scss']
})
export class LearnMoreComponent {
  // The component can include specific methods, properties, and lifecycle hooks as needed.
}
