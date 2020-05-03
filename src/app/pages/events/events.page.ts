import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePage } from 'src/app/shared/interface/basepage';
import { UserEvent } from 'src/app/shared/model/event.model';

/**
 * Home page also seen as the dashboard of the app contains tiles and tab options to many pages.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = 'Events';

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = false;

  inCreateEventView: boolean = false;
  knobValues: any = {
    upper: 120,
    lower: 0,
  };
  eventsList: UserEvent[] = [
    new UserEvent({
      name: 'Insurtech Rising',
      date: new Date('06/29/2020'),
      location: 'London',
      risk: 0.89,
    }),
    new UserEvent({
      name: 'Fintech Expo',
      date: new Date('09/18/2020'),
      location: 'San Francisco',
      risk: 0.56,
    }),
    new UserEvent({
      name: 'Regtech Symposium',
      date: new Date('05/27/2021'),
      location: 'Berlin',
      risk: 0.13,
    }),
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('eventsList')) {
      this.eventsList = JSON.parse(sessionStorage.getItem('eventsList'));
    } else {
      sessionStorage.setItem('eventsList', JSON.stringify(this.eventsList));
    }
    console.log('this.eventsList :>> ', this.eventsList);
  }

  /**
   * Ionic lifecycle event on its display will be triggered to retrieve all enabled items with the use of the [[ApiService]] service.
   */
  async ionViewWillEnter() {
    if (sessionStorage.getItem('eventsList')) {
      this.eventsList = JSON.parse(sessionStorage.getItem('eventsList'));
    } else {
      sessionStorage.setItem('eventsList', JSON.stringify(this.eventsList));
    }
    console.log('this.eventsList :>> ', this.eventsList);
  }

  /**
   * Refreshes the page to reload the data items.
   */
  onRefresher() {
    location.reload();
  }

  gotoEvent(eventId: number) {
    this.router.navigateByUrl('/home/tabs/events/' + eventId);
  }

  createEvent() {
    this.router.navigateByUrl('/home/tabs/events/create');
  }
}
