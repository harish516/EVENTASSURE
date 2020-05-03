import { Component, OnInit, ViewChild } from '@angular/core';
import { SIDE_MENU_ITEMS } from '../shared/constants/app.constants';
import { IonTabBar } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('myTabBar', { static: false }) tabRef: IonTabBar;
  sideMenuItems = [];

  constructor() {}

  ngOnInit() {
    this.sideMenuItems = JSON.parse(localStorage.getItem('sideMenuItems'));

    if (!this.sideMenuItems) {
      this.sideMenuItems = SIDE_MENU_ITEMS;
    }
  }

  setTabBarItems() {
    localStorage.setItem('sideMenuItems', JSON.stringify(this.sideMenuItems));
  }

  setActiveTab(item) {
    // const selected = this.tabs.selected;
    for (const tab of this.sideMenuItems) {
      // chosen tab must be selected
      if (tab.menuTitle === item.menuTitle) {
        tab.isSelected = true;
      } else {
        tab.isSelected = false;
      }
    }
    this.setTabBarItems();
  }

  mouseEnterTab(item) {
    item.isActive = true;
  }

  mouseLeaveTab(item) {
    item.isActive = false;
  }
}
