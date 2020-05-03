import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByComponent } from './filter-by.component';
import { ModalController } from '@ionic/angular';

describe('FilterByComponent', () => {
  let component: FilterByComponent;
  let fixture: ComponentFixture<FilterByComponent>;
  let modalControllerSpy;
  let modalSpy;

  beforeEach(async(() => {
    modalControllerSpy = jasmine.createSpyObj('modalController', ['create']);
    modalSpy = jasmine.createSpyObj('modal', ['present']);
    TestBed.configureTestingModule({
      declarations: [ FilterByComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
