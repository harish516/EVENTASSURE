import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserPage } from './adviser.page';
import { ThousandSuffixesPipe } from 'src/app/shared/utils/pipes/thousand-suffixes.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PopoverController, ModalController } from '@ionic/angular';

describe('AdviserPage', () => {
  let component: AdviserPage;
  let fixture: ComponentFixture<AdviserPage>;
  let popoverControllerSpy;
  let popoverSpy;
  let modalControllerSpy;
  let modalSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ AdviserPage, ThousandSuffixesPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: ModalController, useValue: modalControllerSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
