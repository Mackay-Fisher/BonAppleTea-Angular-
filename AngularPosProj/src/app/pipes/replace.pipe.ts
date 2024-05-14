import { Pipe, PipeTransform } from '@angular/core';

/**
 * `ReplacePipe` transforms a string by replacing specified characters or strings with another.
 */
@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string, find: string, replacement: string): string {
    if (!value) return value;

    return value.replace(new RegExp(find, 'g'), replacement);
  }
}
