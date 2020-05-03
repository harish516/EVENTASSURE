export class ElementTopItemModel {

    policyNo: string;
    agentName: string;
    value: number;

    constructor(policyNo: string, agentName: string, value: number) {
        this.policyNo = policyNo;
        this.agentName = agentName;
        this.value = value;
    }
}
