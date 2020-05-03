import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticesModalPage } from './notices_modal.page';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThousandSuffixesPipe } from 'src/app/shared/utils/pipes/thousand-suffixes.pipe';
import { PopoverController, ModalController, IonicModule } from '@ionic/angular';
import { NoticeModel } from 'src/app/shared/model/notice.model';
import { NoticeTypeEnum } from 'src/app/shared/enum/notice-type.enum';
import { NoticeOriginEnum } from 'src/app/shared/enum/notice-origin.enum';

describe('Notices.PageComponent', () => {
  let component: NoticesModalPage;
  let fixture: ComponentFixture<NoticesModalPage>;
  let popoverControllerSpy;
  let modalControllerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, IonicModule],
      declarations: [NoticesModalPage, ThousandSuffixesPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: ModalController, useValue: modalControllerSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticesModalPage);
    component = fixture.componentInstance;

    // mock input data
    component.noticeModel = new NoticeModel(NoticeTypeEnum.ADVISER, NoticeOriginEnum.ADVISER, '100011', 20000, 3500000, 'test', '1', '1', '1', '1', 'testName');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
