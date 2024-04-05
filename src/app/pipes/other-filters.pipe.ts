import { Pipe, PipeTransform } from '@angular/core';
import { Repo } from '../models/repo.model';

@Pipe({
  name: 'otherFilters',
  standalone: true,
})
export class OtherFiltersPipe implements PipeTransform {
  transform(items: Repo[], filterObj: { stars: number, language: string }): Repo[] {
    if (!items || !filterObj || Object.keys(filterObj).length === 0) {
      return items;
    }
    return items.filter(item => (item.language?.toLowerCase().includes(filterObj.language.toLowerCase())) && item.stars >= filterObj.stars);
  }
}
