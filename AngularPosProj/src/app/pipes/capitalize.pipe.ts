import { Pipe, PipeTransform } from '@angular/core';

/**
 * `CapitalizePipe` transforms a string by capitalizing the first letter of each word.
 */
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[^,]+/g, match => match.charAt(0).toUpperCase() + match.slice(1) + ' ');
  }
}



