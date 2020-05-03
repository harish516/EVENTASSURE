import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/shared/interface/basepage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = 'Chat';

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = false;

  constructor() {}

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
}
