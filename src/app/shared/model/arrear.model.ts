import { ArrearLevel } from '../enum/arrear-level.enum';
import { LastArrear } from '../enum/last-arrear.enum';
import { BaseModel } from './base.model';

export class ArrearModel extends BaseModel {

    policyNo: string;
    arrearsLevel: ArrearLevel;
    policyDetails: string;
    policyOwner: string;
    policyDate: Date;
    lastArrears: LastArrear;
    monthlyPremiumValue1: number;
    monthlyBenefitValue1: number;
    waitingPeriod1: string;
    monthlyPremiumValue2: number;
    monthlyBenefitValue2: number;
    waitingPeriod2: string;
    currentAge: string;
    finishingAge: string;

}
