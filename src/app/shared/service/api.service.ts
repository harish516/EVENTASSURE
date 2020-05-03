import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BASE_PATH } from '../constants/api.constants';
import { AdviserListByFirmModel } from '../model/adviser-list-by-firm.model';
import { AdviserListByNameModel } from '../model/adviser-list-by-name.model';
import { ArrearsListModel } from '../model/arrears-list.model';
import { CancellationListModel } from '../model/cancellations-list.model';
import { ClaimListModel } from '../model/claim-list.model';
import { ComplaintListModel } from '../model/complaint-list.model';
import { CustomerListModel } from '../model/customer-list.model';
import { ElementAbstractModel } from '../model/element-abstract.model';
import { EventListModel } from '../model/event-list.model';
import { FeedbackModel } from '../model/feedback.model';
import { InsightListModel } from '../model/insight-list.model';
import { MeasureModel } from '../model/measure.model';
import { PersonListModel } from '../model/person-list.model';
import { PipelineListModel } from '../model/pipeline-list.model';
import { PolicyListModel } from '../model/policy-list.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchPerson(page: number, size: number, firstName: string, surname: string, sex: string) {
    let filters = '';

    if (firstName && firstName !== '') {
      filters = `&firstName=` + firstName;
    }

    if (surname && surname !== '') {
      filters += `&surname=` + surname;
    }

    if (sex && sex !== '') {
      filters += `&sex=` + sex;
    }

    return this.http.get<PersonListModel>(
      environment.API_SERVER + BASE_PATH + `/person/search?page=` + page + `&size=` + size + filters
    );
  }

  searchPolicy(policyNo: string) {
    return this.http.get<PolicyListModel>(
      environment.API_SERVER + BASE_PATH + `/policy/search?policy_no=` + policyNo
    );
  }

  getAllElementAbstract(agencyLevel: number, agencyLevelId: number) {
    return this.http.get<Array<ElementAbstractModel>>(
      environment.API_SERVER +
        BASE_PATH +
        `/action-insight/element-abstract-all/agent/` +
        agencyLevel +
        `/` +
        agencyLevelId
    );
  }

  getTopMeasures(agencyLevel: number, agencyLevelId: number) {
    return this.http.get<MeasureModel>(
      environment.API_SERVER +
        BASE_PATH +
        `/action-insight/top-measures/agent/` +
        agencyLevel +
        `/` +
        agencyLevelId
    );
  }

  getPipelineCases(agencyLevel: number, agencyLevelId: number) {
    return this.http.get<PipelineListModel>(
      environment.API_SERVER +
        BASE_PATH +
        `/action-insight/pipeline-cases/agent/` +
        agencyLevel +
        `/` +
        agencyLevelId
    );
  }

  getComplaintCases(agencyLevel: number, agencyLevelId: number, filterElement: string) {
    return this.http.get<ComplaintListModel>(
      environment.API_SERVER +
        BASE_PATH +
        `/action-insight/complaint-cases/agent/` +
        agencyLevel +
        `/` +
        agencyLevelId +
        `?filter=` +
        filterElement
    );
  }

  loginSalesforce() {
    return this.http.get(environment.API_SERVER + BASE_PATH + '/salesforce/public/login/');
  }

  getSalesforceAccountByID(accountID: string) {
    return this.http.get(
      environment.API_SERVER + BASE_PATH + '/salesforce/public/account/' + accountID
    );
  }

  getSalesforceAccounts() {
    return this.http.get(environment.API_SERVER + BASE_PATH + '/salesforce/public/account');
  }

  // TODO
  // Temporary reading from json files
  getFiltersData() {
    return this.http.get('assets/data/filter.data.json');
  }

  getHomeData() {
    return this.http.get('assets/data/home.data.json');
  }

  getAllAdvisersByName() {
    return this.http.get<AdviserListByNameModel>('assets/data/advisers-by-name.data.json');
  }

  getAllAdvisersByFirm() {
    return this.http.get<AdviserListByFirmModel>('assets/data/advisers-by-firm.data.json');
  }

  getComplaints() {
    return this.http.get<ComplaintListModel>('assets/data/complaints.data.json');
  }

  getPipelines() {
    return this.http.get<PipelineListModel>('assets/data/pipelines.data.json');
  }

  getEvents() {
    return this.http.get<EventListModel>('assets/data/events.data.json');
  }

  getInsights() {
    return this.http.get<InsightListModel>('assets/data/insights.data.json');
  }

  getPendingTransactions() {
    return this.http.get('assets/data/pending-transactions.data.json');
  }

  getShortTermContracts() {
    return this.http.get('assets/data/short-term-contracts.data.json');
  }

  getClaims() {
    return this.http.get<ClaimListModel>('assets/data/claims.data.json');
  }

  getCancellations() {
    return this.http.get<CancellationListModel>('assets/data/cancellations.data.json');
  }

  getArrears() {
    return this.http.get<ArrearsListModel>('assets/data/arrears.data.json');
  }

  getCustomers() {
    return this.http.get<CustomerListModel>('assets/data/customers.data.json');
  }

  sendFeedback(feedback: FeedbackModel) {
    return this.http.post('https://ai-sales-app.firebaseio.com/feedbacks.json', feedback);
  }
}
