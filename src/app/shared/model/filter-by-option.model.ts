export class FilterByOptionModel {
    key: string;
    description: string;
    isSelected: boolean;

    constructor(key: string, description: string) {
        this.key = key;
        this.description = description;
    }
}
