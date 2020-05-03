import { Component, OnInit } from "@angular/core";

import { ApiService } from "src/app/shared/service/api.service";
import { NoticesModalPage } from "../notice-modal/notices_modal.page";
import { CommonService } from "src/app/shared/service/common.service";
import { NoticeTypeEnum } from "../../shared/enum/notice-type.enum";
import { AdviserListByNameModel } from "src/app/shared/model/adviser-list-by-name.model";
import { AdviserListByFirmModel } from "src/app/shared/model/adviser-list-by-firm.model";
import { AdviserByFirmModel } from "src/app/shared/model/adviser-by-firm.model";
import { AdviserByNameModel } from "src/app/shared/model/adviser-by-name.model";
import { BasePage } from "src/app/shared/interface/basepage";
import { HELP_PAGE_CONTENT } from "src/app/shared/constants/app.constants";
import { NoticeModel } from "src/app/shared/model/notice.model";
import { NoticeOriginEnum } from "src/app/shared/enum/notice-origin.enum";
import { SortByModel } from "src/app/shared/model/sort-by.model";
import { SortByComponent } from "src/app/components/sort-by/sort-by.component";
import { ViewByModel } from "src/app/shared/model/view-by.model";
import { ViewByComponent } from "src/app/components/view-by/view-by.component";
import { Utils } from "../../shared/utils/utils";

/**
 * Advisers page to show a list of advisers/firms.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: "app-adviser",
  templateUrl: "./adviser.page.html",
  styleUrls: ["./adviser.page.scss"]
})
export class AdviserPage implements OnInit, BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = "Advisers";

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = false;

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page description. */
  helpContent = HELP_PAGE_CONTENT.ADVISERS;

  /** Boolean field conditional on whether clients or value display should be shown. */
  displayClients = false;

  /** Boolean field conditional on whether adviser or firm view should be displayed. */
  viewByFirm = false;

  /** Contains the current name of the selected firm. */
  selectedFirm = "";

  /** A reference to the static methods utility class. */
  Utils = Utils;

  /** Contains the current name of the selected agent. */
  selectedAgent = "";

  /** Contains the data returned by [[ApiService.getAllAdvisersByName]]. */
  adviserListByName: AdviserListByNameModel = new AdviserListByNameModel();

  /** Contains the data returned by [[ApiService.getAllAdvisersByFirm]]. */
  adviserListByFirm: AdviserListByFirmModel = new AdviserListByFirmModel();

  /** List with the Sorts options. */
  sortByOptionsList = [
    new SortByModel("BY-ADVISER-OR-FIRM-AZ", "Adviser/Firm (A - Z)"),
    new SortByModel("BY-VALUE-LOW", "Value (Low - High)"),
    new SortByModel("BY-VALUE-HIGH", "Value (High - Low)"),
    new SortByModel("BY-CLIENTS-LOW", "Clients (Low - High)"),
    new SortByModel("BY-CLIENTS-HIGH", "Clients (High - Low)")
  ];

  /** The initial sort. */
  sortedBy = "Adviser/Firm (A - Z)";

  /** The key relating to the sort to be used. */
  sortedByKey = "BY-ADVISER-OR-FIRM-AZ";

  /** List with Filters options. */
  viewByOptionsList = [
    new ViewByModel("BY-TYPE-ADVISER", "Adviser"),
    new ViewByModel("BY-TYPE-FIRM", "Firm")
  ];

  /** An array containing filters to be applied. */
  viewedBy: Array<string> = ["Adviser"];

  /** Disables notice option */
  noticeOptionDisabled = false;

  constructor(
    private apiService: ApiService,
    public commonService: CommonService
  ) {}

  /**
   * On initialisation calls the extracted method to initialise all data.
   */
  ngOnInit() {
    this.initializeItems();
  }

  /**
   * Method uses [[ApiService]] to retrieve JSON data followed by value sorting.
   */
  initializeItems() {
    this.apiService.getAllAdvisersByName().subscribe(data => {
      this.adviserListByName.list = data.list;

      // sort the list according to the parameter received
      switch (this.sortedByKey) {
        case "BY-ADVISER-OR-FIRM-AZ": {
          this.adviserListByName.list.sort((a, b) =>
            a.agentName > b.agentName ? 1 : -1
          );
          break;
        }
        case "BY-VALUE-LOW": {
          this.adviserListByName.list.sort(
            (a, b) => a.totalValue - b.totalValue
          );
          break;
        }
        case "BY-VALUE-HIGH": {
          this.adviserListByName.list.sort(
            (a, b) => a.totalValue - b.totalValue
          );
          this.adviserListByName.list.reverse();
          break;
        }
        case "BY-CLIENTS-LOW": {
          this.adviserListByName.list.sort(
            (a, b) => a.totalClients - b.totalClients
          );
          break;
        }
        case "BY-CLIENTS-HIGH": {
          this.adviserListByName.list.sort(
            (a, b) => a.totalClients - b.totalClients
          );
          this.adviserListByName.list.reverse();
          break;
        }
      }
    });

    this.apiService.getAllAdvisersByFirm().subscribe(data => {
      this.adviserListByFirm.list = data.list;

      // sort the list according to the parameter received
      switch (this.sortedByKey) {
        case "BY-ADVISER-OR-FIRM-AZ": {
          this.adviserListByFirm.list.sort((a, b) =>
            a.agencyLevel2 > b.agencyLevel2 ? 1 : -1
          );
          break;
        }
        case "BY-VALUE-LOW": {
          this.adviserListByFirm.list.sort(
            (a, b) => a.totalValue - b.totalValue
          );
          break;
        }
        case "BY-VALUE-HIGH": {
          this.adviserListByFirm.list.sort(
            (a, b) => a.totalValue - b.totalValue
          );
          this.adviserListByFirm.list.reverse();
          break;
        }
        case "BY-CLIENTS-LOW": {
          this.adviserListByFirm.list.sort(
            (a, b) => a.totalClients - b.totalClients
          );
          break;
        }
        case "BY-CLIENTS-HIGH": {
          this.adviserListByFirm.list.sort(
            (a, b) => a.totalClients - b.totalClients
          );
          this.adviserListByFirm.list.reverse();
          break;
        }
      }
    });
  }

  /**
   * Sets the currently selected firm on item click.
   * @param firm the currently selected firm.
   */
  setSelectedFirm(firm) {
    if (this.selectedFirm === firm) {
      this.selectedFirm = "";
    } else {
      this.selectedFirm = firm;
    }
  }

  /**
   * @ignore
   */
  onFilterItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== "") {
      // this.adviserListByName.list = this.adviserListByName.list.filter((item) => {
      //   return (item.agentName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // });
      // this.adviserListByFirm.list.forEach((element) => {
      //   element.adviserList = element.adviserList.filter((item) => {
      //     return (item.agentName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //   });
      // });
    }
  }

  /**
   * Sends an email to the adviser on swipe button click action with the use of the [[CommonService.sendEmail]] utility method.
   * @param adviser Current adviser item.
   */
  sendEmail(adviser: AdviserByNameModel) {
    this.commonService.sendEmail(adviser.email, "", "");
  }

  /**
   * Sends an phone call to the adviser on swipe button click action with the use of the [[CommonService.call]] utility method.
   * @param phoneNo String value of the phone number to be called.
   */
  call(phoneNo: string) {
    this.commonService.call(phoneNo);
  }

  /**
   * Presents a modal to create a notice for the given adviser.
   * @param adviser Current adviser item to be used for the data of the notice.
   * @param notItemType The type of the notice being created to differentiate the notice.
   */
  async presentAdviserModal(adviser: AdviserByNameModel) {
    this.noticeOptionDisabled = true;

    const noticeModel = new NoticeModel(
      NoticeTypeEnum.ADVISER,
      NoticeOriginEnum.ADVISER,
      undefined,
      adviser.totalClients,
      adviser.totalValue,
      undefined,
      adviser.agencyLevel1,
      adviser.agencyLevel2,
      adviser.agencyLevel3,
      adviser.agencyLevel4,
      adviser.agentName
    );
    const modalData = {
      noticeModel
    };
    const modal = await this.commonService.createModal(
      NoticesModalPage,
      true,
      modalData
    );
    this.noticeOptionDisabled = false;
    return await modal.present();
    // }
  }

  /**
   * Presents a modal to create a notice for the given firm.
   * @param firmModel Current firm item to be used for the data of the notice.
   * @param agentModel The agent associated with the notice to be added to the data of the notice.
   * @param notItemType The type of the notice being created to differentiate the notice.
   */
  async presentFirmModal(
    firmModel: AdviserByFirmModel,
    agentModel: AdviserByNameModel
  ) {
    this.noticeOptionDisabled = true;

    const noticeModel = new NoticeModel(
      NoticeTypeEnum.ADVISER,
      NoticeOriginEnum.ADVISER,
      undefined,
      agentModel.totalClients,
      agentModel.totalValue,
      undefined,
      firmModel.agencyLevel1,
      firmModel.agencyLevel2,
      firmModel.agencyLevel3,
      firmModel.agencyLevel4,
      agentModel.agentName
    );
    const modalData = {
      noticeModel
    };
    const modal = await this.commonService.createModal(
      NoticesModalPage,
      true,
      modalData
    );
    this.noticeOptionDisabled = false;
    return await modal.present();
    // }
  }

  /**
   * Sets the selected agent into the selectedAgent field.
   * @param name Name associated to the selected agent.
   */
  setSelectedAgent(name: string) {
    if (this.selectedAgent === name) {
      this.selectedAgent = "";
    } else {
      this.selectedAgent = name;
    }
  }

  /**
   * Creates a modal based upon the filtered list
   */
  async openViewByOptions(ev: any) {
    // create the component
    this.commonService
      .createPopover(ViewByComponent, false, ev, {
        viewByOptions: this.viewByOptionsList
      })
      // present and listen to the selected option
      .then(popEl => {
        popEl.present();
        return popEl.onDidDismiss();
      })
      // sort based on the option selected
      .then(resultData => {
        if (resultData.role !== "backdrop") {
          this.viewedBy = resultData.data.viewDescription;
          this.viewByFirm = resultData.data.viewOption === "BY-TYPE-FIRM";
        }
      });
  }

  /**
   * Opens a popover for the sorting options
   */
  async openSortByOptions(ev: any) {
    // create the component
    this.commonService
      .createPopover(SortByComponent, false, ev, {
        sortByOptions: this.sortByOptionsList
      })
      // present and listen to the selected option
      .then(popEl => {
        popEl.present();
        return popEl.onDidDismiss();
      })
      // sort based on the option selected
      .then(resultData => {
        if (resultData.role !== "backdrop") {
          this.sortedBy = resultData.data.sortDescription;
          this.sortedByKey = resultData.data.sortOption;
          this.displayClients =
            this.sortedByKey === "BY-CLIENTS-LOW" ||
            this.sortedByKey === "BY-CLIENTS-HIGH";
          this.initializeItems();
        }
      });
  }
}
