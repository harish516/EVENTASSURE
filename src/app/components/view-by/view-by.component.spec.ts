import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByComponent } from './view-by.component';
import { PopoverController } from '@ionic/angular';

describe('ViewByComponent', () => {
  let component: ViewByComponent;
  let fixture: ComponentFixture<ViewByComponent>;
  let popoverControllerSpy;
  let popoverSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewByComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: PopoverController, useValue: popoverControllerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
