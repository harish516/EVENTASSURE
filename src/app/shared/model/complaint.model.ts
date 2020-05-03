import { BaseModel } from './base.model';

export class ComplaintModel extends BaseModel {
    policyNo: string;
    policyOwner: string;
    complaintNo: string;
    complaintDate: Date;
    complaintDetails: string;
    recordedBy: string;
    lastDealtBy: string;
    lastDealtDate: Date;
    monthlyPremiumValue1: number;
    monthlyBenefitValue1: number;
    waitingPeriod1: string;
    monthlyPremiumValue2: number;
    monthlyBenefitValue2: number;
    waitingPeriod2: string;
    currentAge: string;
    finishingAge: string;
}
