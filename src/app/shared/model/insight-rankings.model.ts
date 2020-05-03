import { InsightCategoryEnum } from '../enum/insight-category.enum';
import { EmailModel } from './email-model';

export class InsightRankingModel {
    name: InsightCategoryEnum;
    description: string;
    value: number;
    active: boolean;
    emailModel: EmailModel;

    constructor(
        name: InsightCategoryEnum,
        description: string,
        value: number,
        active: boolean,
        emailModel: EmailModel
    ) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.active = active;
        this.emailModel = emailModel;
    }

}
