import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeFilter',
    pure: false
})
export class ActiveFilterPipe implements PipeTransform {
    transform(items: any[], isActiveFilter: boolean): any {
        if (!items) {
            return items;
        }
        // filter items array which have active attribute by filter active boolean condition
        return items.filter(item => item.active === isActiveFilter);
    }
}