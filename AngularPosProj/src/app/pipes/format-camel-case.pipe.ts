import { Pipe, PipeTransform } from '@angular/core';

/**
 * `FormatCamelCasePipe` transforms camel case strings into a space-separated string with each word capitalized.
 */
@Pipe({
  name: 'formatCamelCase'
})
export class FormatCamelCasePipe implements PipeTransform {
  transform(inputString: string): string {
    return inputString.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
  }
}
