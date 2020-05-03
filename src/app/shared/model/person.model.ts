import { AddressModel } from './address.model';

export class PersonModel {
    perno: number;
    firstName: string;
    surname: string;
    dob: Date;
    sex: string;
    currentAddress: AddressModel;
    niNo: string;
    eMail: string;
    phoneNo: string;
}
