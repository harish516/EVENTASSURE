import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPage } from './settings.page';
import { ActiveFilterPipe } from 'src/app/shared/utils/pipes/active-filter.pipe';
import { PopoverController, ModalController } from '@ionic/angular';

describe('SettingsPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;
  let popoverControllerSpy;
  let modalControllerSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPage, ActiveFilterPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: ModalController, useValue: modalControllerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
