import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BasePage } from 'src/app/shared/interface/basepage';
import { Utils } from 'src/app/shared/utils/utils';
import { takeUntil } from 'rxjs/operators';
import { UserEvent } from 'src/app/shared/model/event.model';
import { ApiService } from 'src/app/shared/service/api.service';
import moment from 'moment';

/**
 * Home page also seen as the dashboard of the app contains tiles and tab options to many pages.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements BasePage, OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = 'Create Event';

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = true;

  createEventForm: FormGroup = new FormGroup({});
  secondEventForm: FormGroup = new FormGroup({});
  thirdEventForm: FormGroup = new FormGroup({});

  todayDate: string = new Date().toISOString();

  knobValues: any = {
    upper: 120,
    lower: 0,
  };
  // default to first stage of create event
  currentStage = 1;
  previousRisk = 0.1;
  risk = 0.1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.initCreateEventForms();
  }

  /**
   * Ionic lifecycle event on its display will be triggered to retrieve all enabled items with the use of the [[ApiService]] service.
   */
  async ionViewWillEnter() {}

  /**
   * Refreshes the page to reload the data items.
   */
  onRefresher() {
    location.reload();
  }

  initCreateEventForms() {
    this.createEventForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
    });

    this.createEventForm
      .get('date')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        console.log('inside date value change');
        if (val) {
          const currentMoment = moment();
          const monthAway = currentMoment.add(1, 'M');
          const twoMonthsAway = currentMoment.add(2, 'M');
          console.log('twoMonthsAway :>> ', twoMonthsAway);
          if (moment(new Date(val)).isBefore(monthAway)) {
            this.risk = 0.4;
          } else if (moment(new Date(val)).isBefore(twoMonthsAway)) {
            this.risk = 0.3;
          } else {
            this.risk = 0.2;
          }
          this.previousRisk = this.risk;
        }
      });

    this.secondEventForm = this.fb.group({
      participantCount: new FormControl(null, [Validators.required]),
      familyAgeRange: new FormControl(null, [Validators.required]),
    });

    this.secondEventForm
      .get('participantCount')
      .valueChanges.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((val) => {
        console.log('inside date value change');
        if (val) {
          //revert risk value
          if (this.risk > this.previousRisk) {
            this.risk = this.previousRisk;
          } else {
            this.previousRisk = this.risk;
          }
          if (val <= 10) {
            this.risk += 0.1;
          } else if (val <= 30) {
            this.risk += 0.2;
          } else if (val <= 100) {
            this.risk += 0.4;
          } else if (val <= 300) {
            this.risk += 0.5;
          } else {
            this.risk = 1;
          }
        } else {
          this.risk = this.previousRisk;
        }
      });

    this.thirdEventForm = this.fb.group({
      staffArray: new FormArray([
        new FormGroup({
          staffName: new FormControl(null, [Validators.required]),
          staffMobile: new FormControl(null, [Validators.required]),
        }),
      ]),
    });
  }

  submitEventForm() {
    console.log('createEventForm :>> ', this.createEventForm);
    Utils.validateAllFields(this.createEventForm);
    if (this.createEventForm.valid) {
      this.currentStage = 2;
    }
  }

  submitSecondForm() {
    console.log('submit second form');
    Utils.validateAllFields(this.secondEventForm);
    if (this.secondEventForm.valid) {
      this.currentStage = 3;
    }
  }

  /**
   * Dynamically adds controls to given formArray for use in Contacts
   * @param formArray The formArray that the control should be added to.
   */
  addControl() {
    (this.thirdEventForm.get('staffArray') as FormArray).push(
      new FormGroup({
        staffName: new FormControl(null, [Validators.required]),
        staffMobile: new FormControl(null, [Validators.required]),
      })
    );
  }

  /**
   * Dynamically removes controls from given formArray
   * @param formArray The formArray that the control should be removed from.
   * @param index The id of the control within the formArray
   */
  removeControl(index: number) {
    // the first control should always be visible and never deleted only reset its value
    if (index === 0) {
      (this.getFormArray('staffArray') as FormArray).at(0).reset();
    } else {
      // other controls can be removed as usual
      (this.getFormArray('staffArray') as FormArray).removeAt(index);
    }
  }

  submitThirdForm() {
    let _form1Data = this.createEventForm.getRawValue();
    if (sessionStorage.getItem('eventsList')) {
      let _eventsList: UserEvent[] = JSON.parse(sessionStorage.getItem('eventsList'));
      _eventsList.push(
        new UserEvent({
          name: _form1Data.name,
          date: new Date(_form1Data.date),
          location: _form1Data.location,
          risk: this.risk,
        })
      );
      sessionStorage.setItem('eventsList', JSON.stringify(_eventsList));
      this.router.navigate(['..'], { relativeTo: this.route });
    } else {
      this.apiService.getEvents().subscribe((data) => {
        let _eventsList: UserEvent[] = data.list;
        _eventsList.push(
          new UserEvent({
            name: _form1Data.name,
            date: new Date(_form1Data.date),
            location: _form1Data.location,
            risk: this.risk,
          })
        );
        sessionStorage.setItem('eventsList', JSON.stringify(_eventsList));
        this.router.navigate(['..'], { relativeTo: this.route });
      });
    }
  }

  getFormArray(fieldName: string) {
    return this.thirdEventForm.get(fieldName) as FormArray;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // unsubscribe
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
