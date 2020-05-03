import { BaseModel } from './base.model';

export class CustomerModel extends BaseModel {

    policyNo: string;
    policyOwner: string;
    policyDetails: string;
    policyDate: Date;
    monthlyPremium: number;
    monthlyBenefitValue1: number;
    monthlyBenefitValue2: number;
    currentAge: string;
    finishingAge: string;

}
