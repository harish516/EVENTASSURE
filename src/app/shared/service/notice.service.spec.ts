import { NoticeService } from "./notice.service";

/** Straight Jasmine testing without Angular's testing support on basic NoticeService */
describe('NoticeService', () => {
    let service: NoticeService;
    beforeEach(() => { service = new NoticeService(); });
  
    it('#getValue should return real value', () => {
      expect(service.getNotices()).not.toBeUndefined();
      expect(service.getNotices()).not.toBeNull();
    });
  });