/** Base model class to be extended by other classes which require the use of a filter. */
export class BaseModel {

    /** The first line of the filter - Region. */    
    agencyLevel1: string;
    /** The second line of the filter - Adviser Firm. */     
    agencyLevel2: string;
    /** The third line of the filter - Branch. */      
    agencyLevel3: string;
    /** The fourth line of the filter - Adviser. */      
    agencyLevel4: string;
    /** The agent name filter */      
    agentName: string;

    constructor(
        agencyLevel1: string,
        agencyLevel2: string,
        agencyLevel3: string,
        agencyLevel4: string,
        agentName: string,
    ) {
        this.agencyLevel1 = agencyLevel1;
        this.agencyLevel2 = agencyLevel2;
        this.agencyLevel3 = agencyLevel3;
        this.agencyLevel4 = agencyLevel4;
        this.agentName = agentName;
    }
}
