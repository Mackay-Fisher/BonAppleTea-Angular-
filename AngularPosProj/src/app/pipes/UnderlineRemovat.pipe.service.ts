import { Pipe, PipeTransform } from '@angular/core';

/**
 * `ReplaceUnderscoresPipe` transforms a string by replacing all underscores with spaces.
 */
@Pipe({
  name: 'replaceUnderscores'
})
export class ReplaceUnderscoresPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/_/g, ' ');
  }
}
