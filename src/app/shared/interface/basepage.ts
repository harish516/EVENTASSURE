/** Interface implemented by pages that are displayed to inherit the page title field and optionally content to be used for help. */
export interface BasePage {
  /** Page title to be shown for the header of the page. */

  pageTitle: string;
  /** Boolean conditional sent to the header to control the appearance of the back button. */

  hasBackBtn?: boolean;
  /** A string of HTML content to be displayed as the description of a help page/app guide. */

  helpContent?: string;
}
