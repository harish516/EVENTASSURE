import { BaseModel } from './base.model';

export class FilterModel extends BaseModel {

    constructor(agencyLevel1: string, agencyLevel2: string,
                agencyLevel3: string, agencyLevel4: string,
                agentName: string) {
        super(agencyLevel1, agencyLevel2, agencyLevel3, agencyLevel4, agentName);
    }
}
