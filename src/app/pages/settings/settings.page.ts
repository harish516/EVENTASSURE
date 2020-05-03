import { Component, OnInit, ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { BasePage } from 'src/app/shared/interface/basepage';

/**
 * Settings page which allows the user to change preferences for what the app should display for them
 *  as well as ranking on how the insights should work.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = 'Settings';

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = false;

  constructor() {}

  /**
   * On initialisation sorts the ranking list.
   */
  ngOnInit() {}
}
