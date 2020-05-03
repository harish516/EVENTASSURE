import { NoticeTypeEnum } from '../enum/notice-type.enum';
import { BaseModel } from './base.model';
import { NoticeOriginEnum } from '../enum/notice-origin.enum';

export class NoticeModel extends BaseModel {

  noticeId: number; // TODO: use web service
  noticeType: NoticeTypeEnum;
  noticeOrigin: NoticeOriginEnum;
  policyNo: string;
  totalClients: number;
  totalValue: number;
  noticeDescription: string;

  constructor(
    noticeType: NoticeTypeEnum,
    noticeOrigin: NoticeOriginEnum,
    policyNo: string,
    totalClients: number,
    totalValue: number,
    noticeDescription: string,
    agencyLevel1: string,
    agencyLevel2: string,
    agencyLevel3: string,
    agencyLevel4: string,
    agentName: string
  ) {

    super(agencyLevel1, agencyLevel2, agencyLevel3, agencyLevel4, agentName);

    // set unique id for notice
    let noticeIdCounter = Number(localStorage.getItem('noticeIdCounter'));
    if (!noticeIdCounter) {
      noticeIdCounter = 1;
    } else {
      noticeIdCounter += noticeIdCounter;
    }
    localStorage.setItem('noticeIdCounter', String(noticeIdCounter));

    this.noticeId = noticeIdCounter;
    this.noticeType = noticeType;
    this.noticeOrigin = noticeOrigin;
    this.policyNo = policyNo;
    this.totalClients = totalClients;
    this.totalValue = totalValue;
    this.noticeDescription = noticeDescription;
  }
}
