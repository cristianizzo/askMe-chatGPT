import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'appFilter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(
    items: any[],
    searchText: string,
    searchKeys: any[],
    prop?: string,
    value?: any
  ): any[] {
    if (!items) {
      return [];
    }

    if (prop) {
      items = items.filter((item: any) => item[prop] === value);
    }

    if (!searchText) {
      return items;
    }

    searchText = searchText.toLocaleLowerCase();

    return items.filter((item: any) =>
      searchKeys.some((key) =>
        _.get(item, key.split('.')).toLocaleLowerCase().includes(searchText)
      )
    );
  }
}
