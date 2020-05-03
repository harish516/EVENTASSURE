import { ElementAbstractDetModel } from './element-abstract-det.model';

export class ElementAbstractModel {
    elementName: string;
    elementDisplayName: string;
    numberOfItems: number;
    dataSource: string;
    iconName: string;
    tileColor: string;
    subElementsList: ElementAbstractDetModel[];
}
