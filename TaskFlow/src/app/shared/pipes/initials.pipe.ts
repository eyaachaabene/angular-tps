import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const words = value?.trim().split(/\s+/).filter(Boolean) ?? [];
    return words.length === 0
      ? '?'
      : words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join('');
  }
}
