import { Injectable } from '@angular/core';
import { FilterModel } from '../model/filter.model';

@Injectable({
    providedIn: 'root'
})

export class FilterService {

    private filters: FilterModel;

    constructor() {
        this.filters = JSON.parse(localStorage.getItem('filters'));
        if (!this.filters) {
          this.filters = new FilterModel('', '', '', '', '');
        }
    }

    getFilters(): FilterModel {
        return this.filters;
    }

    applyFilter(list: any): any {

        const FILTERS = this.getFilters();
        list = list.filter((item) => {

            if (FILTERS.agencyLevel2) {
                if (item.agencyLevel2 !== FILTERS.agencyLevel2) {
                    return false;
                }
            }

            if (FILTERS.agencyLevel3) {
                if (item.agencyLevel3 !== FILTERS.agencyLevel3) {
                return false;
                }
            }

            if (FILTERS.agencyLevel4) {
                if (item.agencyLevel4 !== FILTERS.agencyLevel4) {
                return false;
                }
            }

            if (FILTERS.agentName) {
                if (item.agentName !== FILTERS.agentName) {
                return false;
                }
            }

            return true;
        });

        return list;
    }

    hasAppliedFilter(): boolean {
        const FILTERS = this.getFilters();
        if (FILTERS.agencyLevel3
            || FILTERS.agencyLevel4
            || FILTERS.agentName) {
            return true;
        } else {
            return false;
        }
    }
}
