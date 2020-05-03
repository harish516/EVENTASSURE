import { ProductModel } from './product.model';
import { FrequencyModel } from './frequency.model';
import { StatusModel } from './status.model';

export class PolicyModel {
    policyNo: string;
    status: StatusModel;
    startDate: Date;
    endDate: Date;
    nextExpPremiumDate: Date;
    product: ProductModel;
    frequency: FrequencyModel;
}
