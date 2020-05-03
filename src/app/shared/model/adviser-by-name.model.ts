import { BaseModel } from './base.model';

/** This holds data on an adviser from the view of the singular adviser. */ 
export class AdviserByNameModel extends BaseModel {

    /** The contact email of the adviser. */     
    email: string;

    /** The contact phone number of the adviser. */       
    telephone: string;

    /** The total value the adviser is worth */
    totalValue: number;

    /** The total amount of clients under the adviser */
    totalClients: number;
    
}
