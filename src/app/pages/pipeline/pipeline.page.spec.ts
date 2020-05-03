import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinePage } from './pipeline.page';
import { ThousandSuffixesPipe } from 'src/app/shared/utils/pipes/thousand-suffixes.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PopoverController, ModalController } from '@ionic/angular';

describe('PipelinePage', () => {
  let component: PipelinePage;
  let fixture: ComponentFixture<PipelinePage>;
  let popoverControllerSpy;
  let modalControllerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PipelinePage, ThousandSuffixesPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: ModalController, useValue: modalControllerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
