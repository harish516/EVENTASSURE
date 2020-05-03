import { ElementTopItemModel } from './element-top-item.model';

export class ElementAbstractDetModel {
    value: number;
    amount: number;
    meaning: string;
    topItemList: ElementTopItemModel[];

    constructor(value: number, amount: number, meaning: string, topItemList: ElementTopItemModel[]) {
        this.value = value;
        this.amount = amount;
        this.meaning = meaning;
        this.topItemList = topItemList;
    }
}
