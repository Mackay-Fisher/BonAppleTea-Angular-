import { Pipe, PipeTransform } from '@angular/core';

/**
 * `CapitalizeAndReplacePipe` transforms a string by replacing underscores with spaces and capitalizing each word.
 * It also ensures proper spacing after commas.
 */
@Pipe({
  name: 'capitalizeAndReplace'
})
export class CapitalizeAndReplacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value.replace(/_/g, ' ').replace(/\b\w/g, firstLetter => firstLetter.toUpperCase()).replace(/,/g, ', ');
  }
}
