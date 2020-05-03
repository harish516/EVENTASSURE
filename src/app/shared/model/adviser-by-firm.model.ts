import { BaseModel } from './base.model';
import { AdviserByNameModel } from './adviser-by-name.model';

/** This holds data on an adviser from the view of the firm. */ 
export class AdviserByFirmModel extends BaseModel {

    /** Total value the firm is worth. */
    totalValue: number;

    /** Total client the firm has. */    
    totalClients: number;

    /** The list of advisers belonging to the firm. */    
    adviserList: AdviserByNameModel[] = [];

}
