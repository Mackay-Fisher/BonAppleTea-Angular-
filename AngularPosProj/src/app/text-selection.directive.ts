import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appTextSelection]'
})
export class TextSelectionDirective {
  @Output() textSelected = new EventEmitter<string>();

  constructor() {}

  @HostListener('mouseup') onMouseUp() {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText) {
      this.textSelected.emit(selectedText);
    }
  }


}

