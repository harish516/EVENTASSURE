import { BaseModel } from './base.model';
import { ClaimStatus } from '../enum/claim-status.enum';
import { ClaimPeriod } from '../enum/claim-period.enum';

export class ClaimModel extends BaseModel {

    policyNo: string;
    policyStatus: ClaimStatus;
    policyDate: Date;
    policyOwner: string;
    policyDetails: string;
    claimPeriod: ClaimPeriod;
    monthlyPremiumValue1: number;
    monthlyBenefitValue1: number;
    waitingPeriod1: string;
    monthlyPremiumValue2: number;
    monthlyBenefitValue2: number;
    waitingPeriod2: string;
    currentAge: string;
    finishingAge: string;

}
