import { BaseModel } from './base.model';

export class PipelineModel extends BaseModel {
    policyNo: string;
    policyType: string;
    policyStatus: string;
    policyDate: Date;
    policyOwner: string;
    policyDetails: string;
    policyPeriod: string;
    monthlyPremiumValue1: number;
    monthlyBenefitValue1: number;
    waitingPeriod1: string;
    monthlyPremiumValue2: number;
    monthlyBenefitValue2: number;
    waitingPeriod2: string;
    premiumOption: string;
    currentAge: string;
    finishingAge: string;
    riskFactor: number;
}
