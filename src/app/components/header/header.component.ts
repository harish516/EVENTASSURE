import { Component, Input, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

/**
 * Template component to be used on every page for header.
 * Example Usage:
 *  ```
 * <app-header [pageTitle]="pageTitle" [hasBackBtn]="hasBackBtn" [helpContent]="helpContent"></app-header>
 *  ```
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /** Input field taken from the html header component to represent the help title. */
  @Input() pageTitle = '';
  /** Input field taken from the html header component to represent whether the backBtn should be shown. */
  @Input() hasBackBtn = false;
  /** Input field taken from the html header component to represent the current help page description. */
  @Input() helpContent = '';

  /** Boolean value to represent enabling of filter. */
  isFilterOn = false;

  constructor(private menuCtrl: MenuController, private popoverController: PopoverController) {}

  /**
   * Used to apply the filter on initialisation.
   */
  ngOnInit() {}

  /**
   * Toggles the filter menu to show with the use of the Ionic MenuController.
   */
  openFilterMenu() {
    this.menuCtrl.toggle('filter-menu');
  }
}
