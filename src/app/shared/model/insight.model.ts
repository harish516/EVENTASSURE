import { InsightCaseModel } from './insight-case.model';
import { BaseModel } from './base.model';

export class InsightModel extends BaseModel {
    id: number;
    type: string;
    chartType: string;
    value: number;
    description: string;
    cases: InsightCaseModel[];
}
