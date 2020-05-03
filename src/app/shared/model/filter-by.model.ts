import { FilterByOptionModel } from './filter-by-option.model';

export class FilterByModel {
    title: string;
    options: FilterByOptionModel[];

    constructor(title: string, options: FilterByOptionModel[]) {
        this.title = title;
        this.options = options;
    }
}
