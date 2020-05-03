import { BaseModel } from './base.model';
import { CancellationReason } from '../enum/cancellation-reason.enum';

export class CancellationModel extends BaseModel {

    policyNo: string;
    cancellationReason: CancellationReason;
    policyOwner: string;
    policyDetails: string;
    policyDate: Date;
    cancellationPeriod: string;
    monthlyPremium: number;
    monthlyBenefitValue1: number;
    monthlyBenefitValue2: number;
    currentAge: string;
    finishingAge: string;

}
