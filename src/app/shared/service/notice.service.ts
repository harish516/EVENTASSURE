import { Injectable } from '@angular/core';
import { NoticeModel } from '../model/notice.model';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor() { }

  // returns a list of notices
  // TODO: convert to web service from localStorage
  getNotices(): Array<NoticeModel> {
    let notices: Array<NoticeModel> = JSON.parse(localStorage.getItem('noticeList'));
    if (!notices) {
      notices = new Array<NoticeModel>();
    }
    return notices;
  }
}
