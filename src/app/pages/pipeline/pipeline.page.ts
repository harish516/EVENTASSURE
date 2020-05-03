import { Component, OnInit, ViewChild } from "@angular/core";
import { LoadingController, IonVirtualScroll } from "@ionic/angular";

import { ApiService } from "../../shared/service/api.service";
import { PipelineListModel } from "../../shared/model/pipeline-list.model";
import { PipelineModel } from "../../shared/model/pipeline.model";
import { NoticesModalPage } from "../notice-modal/notices_modal.page";
import { FilterService } from "src/app/shared/service/filter.service";
import { CommonService } from "src/app/shared/service/common.service";
import { NoticeTypeEnum } from "src/app/shared/enum/notice-type.enum";
import { BasePage } from "src/app/shared/interface/basepage";
import { HELP_PAGE_CONTENT } from "src/app/shared/constants/app.constants";
import { SortByComponent } from "src/app/components/sort-by/sort-by.component";
import { SortByModel } from "src/app/shared/model/sort-by.model";
import { FilterByComponent } from "src/app/components/filter-by/filter-by.component";
import { FilterByModel } from "src/app/shared/model/filter-by.model";
import { FilterByOptionModel } from "src/app/shared/model/filter-by-option.model";
import { NoticeModel } from "src/app/shared/model/notice.model";
import { NoticeOriginEnum } from "src/app/shared/enum/notice-origin.enum";
import { Utils } from "../../shared/utils/utils";
import { ActivatedRoute } from "@angular/router";

/**
 * Pipelines page which displays policies undergoing application or cooldown status.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: "app-pipeline",
  templateUrl: "./pipeline.page.html",
  styleUrls: ["./pipeline.page.scss"]
})
export class PipelinePage implements OnInit, BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = "High Risk";

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = true;

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page description. */
  helpContent = HELP_PAGE_CONTENT.PIPELINE;

  /** Sort by options to be available to apply on data. */
  sortByOptionsList = [
    new SortByModel("BY-ADVISER-AZ", "Adviser (A - Z)"),
    new SortByModel("BY-POLICY", "Policy"),
    new SortByModel("BY-VALUE-LOW", "Value (Low - High)"),
    new SortByModel("BY-VALUE-HIGH", "Value (High - Low)")
  ];

  /** The initial sort. */
  sortedBy = "Risk (High - Low)";

  /** The key relating to the sort to be used. */
  sortedByKey = "BY-RISK-HIGH";

  /** Filters to be applied by the options good/bad for pipelines. */
  filterByOptionsList = [
    new FilterByModel("Type", [
      new FilterByOptionModel("BY-GOOD", "Good"),
      new FilterByOptionModel("BY-BAD", "Bad")
    ]),
    new FilterByModel("Status", [
      new FilterByOptionModel("BY-AWAITING-MEDICAL", "Awaiting medical"),
      new FilterByOptionModel("BY-APP-ERRORS", "Application errors"),
      new FilterByOptionModel("BY-UNDERWRITING", "Underwriting"),
      new FilterByOptionModel("BY-ACTIVATION", "Activation"),
      new FilterByOptionModel("BY-FIRST_PREMIUM", "First premium")
    ])
  ];

  /** An array containing filters to be applied. */
  filteredBy: Array<string> = ["None"];

  /** An array containing filters to be applied based upon keys. */
  filteredByKeys: Array<string> = ["NONE"];

  /** Is a reference to the DOM element so that methods can be called on the ionic virtual scroll. */
  @ViewChild("pipelineVirtualScroll", {static: true}) pipelineVirtualScroll: IonVirtualScroll;

  /** Used to help re-render the list of items between the previously and currently selecting items. */
  previouslySelectedItem: PipelineModel;

  /** Is the list model object of the pipeline list. */
  pipeModel: PipelineListModel = new PipelineListModel();

  /** The currently selected policy number as a string. */
  selectedPolicy = "";

  /** A reference to the static methods utility class. */
  Utils = Utils;

  /** Disables notice btn option */
  noticeBtnDisabled = false;

  /** Field which contains the filter selected on Home Page, if any */
  filterPath: string;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private filterService: FilterService,
    public commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  /**
   * On initialisation calls the method to retrieve the pipeline data.
   */
  ngOnInit() {
    // check if any filter has been set from home page
    this.filterPath = this.route.snapshot.queryParamMap.get("filter");
    if (this.filterPath) {
      if (this.filterPath === "Good") {
        this.filteredBy = ["Good"];
        this.filteredByKeys = ["BY-GOOD"];
      } else {
        this.filteredBy = ["Bad"];
        this.filteredByKeys = ["BY-BAD"];
      }
    }

    this.getPipelineCases();
  }

  /**
   * Presents an alert on error when retrieving the pipeline data.
   */
  async presentPipelineAlert() {
    this.commonService.presentAlert(
      "Error Occured While Getting Cases",
      "Please reload the app and try again.",
      ["OK"]
    );
  }

  /**
   * Sets the current selected pipeline using the given policy number identifier.
   * @param policyNo The id related to the current pipeline being the policy number.
   */
  setSelectedPolicy(policyNo: string) {
    if (this.selectedPolicy === policyNo) {
      this.selectedPolicy = "";
    } else {
      this.selectedPolicy = policyNo;
    }
  }

  /**
   * Sends an email with the relevant pipeline details with the use of the [[CommonService.sendEmail]] utility method.
   * @param pipeline The pipeline object to use when sending an email.
   */
  sendEmail(pipeline: PipelineModel) {
    this.commonService.sendEmail(
      "user@example.com",
      "Pipeline / Policy: " + pipeline.policyNo,
      "Type: " + pipeline.policyType + " / Status: " + pipeline.policyStatus
    );
  }

  /**
   * Makes a phone call with the given phone number with the use of the [[CommonService.call]] utility method.
   * @param phoneNo String value of the pipelines related phone number to be called.
   */
  call(phoneNo: string) {
    this.commonService.call(phoneNo);
  }

  /**
   * Returns the required pipeline data with the use of the [[ApiService.getPipelines]] method followed by applying filters and sorts.
   */
  async getPipelineCases() {
    // must remove references of previously selected item on good/bad filter change
    this.previouslySelectedItem = undefined;
    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    await loading.present();

    this.apiService.getPipelines().subscribe(data => {
      this.pipeModel.list = this.filterService.applyFilter(data.list);

      // apply filters
      if (
        this.filteredByKeys.includes("BY-GOOD") ||
        this.filteredByKeys.includes("BY-BAD")
      ) {
        this.pipeModel.list = this.pipeModel.list.filter(
          obj =>
            obj.policyType ===
              (this.filteredByKeys.includes("BY-GOOD") ? "Good" : "") ||
            obj.policyType ===
              (this.filteredByKeys.includes("BY-BAD") ? "Bad" : "")
        );
      }

      if (
        this.filteredByKeys.includes("BY-AWAITING-MEDICAL") ||
        this.filteredByKeys.includes("BY-APP-ERRORS") ||
        this.filteredByKeys.includes("BY-UNDERWRITING") ||
        this.filteredByKeys.includes("BY-ACTIVATION") ||
        this.filteredByKeys.includes("BY-FIRST_PREMIUM")
      ) {
        this.pipeModel.list = this.pipeModel.list.filter(
          obj =>
            obj.policyStatus ===
              (this.filteredByKeys.includes("BY-AWAITING-MEDICAL")
                ? "Awaiting medical"
                : "") ||
            obj.policyStatus ===
              (this.filteredByKeys.includes("BY-APP-ERRORS")
                ? "Application errors"
                : "") ||
            obj.policyStatus ===
              (this.filteredByKeys.includes("BY-UNDERWRITING")
                ? "Underwriting"
                : "") ||
            obj.policyStatus ===
              (this.filteredByKeys.includes("BY-ACTIVATION")
                ? "Activation"
                : "") ||
            obj.policyStatus ===
              (this.filteredByKeys.includes("BY-FIRST_PREMIUM")
                ? "First premium"
                : "")
        );
      }

      // sort the list according to the parameter received
      switch (this.sortedByKey) {
        case "BY-ADVISER-AZ": {
          this.pipeModel.list.sort((a, b) =>
            a.agentName > b.agentName ? 1 : -1
          );
          break;
        }
        case "BY-RISK-HIGH": {
          this.pipeModel.list.sort((a, b) => 
            a.riskFactor < b.riskFactor ? 1 : -1
          )
          break;
        }
        case "BY-POLICY": {
          this.pipeModel.list.sort((a, b) =>
            a.policyNo > b.policyNo ? 1 : -1
          );
          break;
        }
        case "BY-VALUE-LOW": {
          this.pipeModel.list.sort(
            (a, b) =>
              a.monthlyBenefitValue1 +
              a.monthlyBenefitValue2 -
              (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
          );
          break;
        }
        case "BY-VALUE-HIGH": {
          this.pipeModel.list.sort(
            (a, b) =>
              a.monthlyBenefitValue1 +
              a.monthlyBenefitValue2 -
              (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
          );
          this.pipeModel.list.reverse();
          break;
        }
      }

      loading.dismiss();
    });
  }

  /**
   * Sets the current focused pipeline object with rerendering of the object on expansion of the item.
   * @param pipeline The pipeline object being selected.
   */
  onItemTapped(pipeline: PipelineModel) {
    this.setSelectedPolicy(pipeline.policyNo);
    this.rerenderPipelineItems(pipeline);
  }

  /**
   * Re-renders the virtual scroll based upon the index of the currently selected item and the next selected item.
   * @param pipeline The current selected pipeline within the virtual scroll.
   */
  rerenderPipelineItems(pipeline: PipelineModel) {
    const indexSelectedItem = this.pipeModel.list.indexOf(pipeline);
    if (!this.previouslySelectedItem) {
      // method used for re-rendering of items
      if (indexSelectedItem === 0) {
        // if first item check range length from itself
        this.pipelineVirtualScroll.checkRange(
          indexSelectedItem,
          this.pipeModel.list.length - indexSelectedItem
        );
      } else {
        // else check before item until itself use length - previous item
        this.pipelineVirtualScroll.checkRange(
          indexSelectedItem - 1,
          this.pipeModel.list.length - (indexSelectedItem - 1)
        );
      }
    } else {
      const previouslySelectedItemIndex = this.pipeModel.list.indexOf(
        this.previouslySelectedItem
      );
      const indexFirstItem =
        previouslySelectedItemIndex < indexSelectedItem
          ? previouslySelectedItemIndex
          : indexSelectedItem;
      // method used for re-rendering of items
      if (indexFirstItem === 0) {
        // if first item check range length from itself
        this.pipelineVirtualScroll.checkRange(
          indexFirstItem,
          this.pipeModel.list.length - indexFirstItem
        );
      } else {
        // else check before item until itself use length - previous item
        this.pipelineVirtualScroll.checkRange(
          indexFirstItem - 1,
          this.pipeModel.list.length - (indexFirstItem - 1)
        );
      }
    }

    this.previouslySelectedItem = pipeline;
  }
  /**
   * Re-renders the virtual scroll based upon the index of the currently selected item and the next selected item.
   * @param pipeModel The current selected pipeline to be used for the notice.
   */
  async presentModal(pipeModel: PipelineModel) {
    this.noticeBtnDisabled = true;

    const noticeModel = new NoticeModel(
      NoticeTypeEnum.POLICY,
      NoticeOriginEnum.PIPELINE,
      pipeModel.policyNo,
      undefined,
      pipeModel.monthlyBenefitValue1 + pipeModel.monthlyBenefitValue2,
      undefined,
      pipeModel.agencyLevel1,
      pipeModel.agencyLevel2,
      pipeModel.agencyLevel3,
      pipeModel.agencyLevel4,
      pipeModel.agentName
    );
    const modalData = {
      noticeModel
    };

    const modal = await this.commonService.createModal(
      NoticesModalPage,
      true,
      modalData
    );

    this.noticeBtnDisabled = false;
    return await modal.present();
  }

  /**
   * Creates a modal based upon the filtered list
   */
  async openFilterByOptions() {
    const data = {
      filterByList: this.filterByOptionsList
    };
    await this.commonService
      .createModal(FilterByComponent, true, data)
      // present and listen to the selected option
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      // filter based on the option selected
      .then(resultData => {
        // check if user applied any filter
        if (resultData.role === "applied") {
          this.filteredBy.length = 0;
          this.filteredByKeys.length = 0;

          // check what filters were applied
          this.filterByOptionsList.forEach(filter => {
            filter.options.forEach(item => {
              if (item.isSelected) {
                this.filteredBy.push(item.description);
                this.filteredByKeys.push(item.key);
              }
            });
          });

          // set none in case no filter selected
          if (this.filteredBy.length === 0) {
            this.filteredBy.push("None");
            this.filteredByKeys.push("NONE");
          }

          // call the service to apply filters
          this.getPipelineCases();
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
          this.getPipelineCases();
        }
      });
  }

  /**
   * Display a message "Coming soon"
   */
  openQuote() {
    this.commonService.presentToast(
      "Not implemented yet. Coming soon!",
      "medium"
    );
  }
}
