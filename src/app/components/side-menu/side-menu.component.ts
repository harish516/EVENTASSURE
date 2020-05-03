import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SIDE_MENU_ITEMS } from '../../shared/constants/app.constants';

/**
 * Component represents the swipable menu for both the side and filter menus.
 */
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  /** Field holds an array of all the items saved in the menu. */
  sideMenuItems = [];

  constructor(private router: Router, private menuCtrl: MenuController) {}

  /**
   * On initialisation the side menu items are loaded and relevant filters are applied to data.
   */
  ngOnInit() {
    this.sideMenuItems = JSON.parse(localStorage.getItem('sideMenuItems'));

    if (!this.sideMenuItems) {
      this.sideMenuItems = SIDE_MENU_ITEMS;
    }
  }

  /**
   * Navigates to a path associated with the router module after toggling the menu
   * @param path specified name associated with router path to be navigated to
   */
  onNavigateByUrl(path: string) {
    this.menuCtrl.toggle();
    this.router.navigateByUrl(path);
  }

  /**
   * Sets the tab bar items based on the local storage
   */
  setTabBarItems() {
    localStorage.setItem('sideMenuItems', JSON.stringify(this.sideMenuItems));
  }

  /**
   * Refreshes the page to set the initialisation changes to take place
   */
  applyMenuChanges() {
    location.reload();
  }
}
