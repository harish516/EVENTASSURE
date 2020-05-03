import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BasePage } from 'src/app/shared/interface/basepage';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/service/api.service';
import { FilterService } from 'src/app/shared/service/filter.service';
import { CommonService } from 'src/app/shared/service/common.service';
import { ElementAbstractModel } from 'src/app/shared/model/element-abstract.model';
import { ElementAbstractDetModel } from 'src/app/shared/model/element-abstract-det.model';
import { ComplaintModel } from 'src/app/shared/model/complaint.model';
import { ElementTopItemModel } from 'src/app/shared/model/element-top-item.model';

import { Utils } from "../../../shared/utils/utils";



/**
 * Home page also seen as the dashboard of the app contains tiles and tab options to many pages.
 * Implements [[BasePage]] due to it being a page that makes use of the header and requires fields.
 */
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements BasePage {
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page title. */
  pageTitle = 'Event Details';

  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use for conditional back button display. */
  hasBackBtn = true;

  eventId: number;
  /** Field inherited from the [[BasePage]] interface for use in header arguments. Use included in help page description. */
  helpContent = '';

  /** Contains an array of the objects to be displayed in the tiles. */
  abstractElementList: ElementAbstractModel[];

  /** Field that holds the value of the annual premium. */
  // Asked to be Fixed value for DEMO pourpose
  annualPremiumPerc = 15;

  /** Field that holds the value of the potential earnings that could be made. */
  potentialEarningsAmount = 0;

  /** Conditional boolean that controls whether the annualised display should be shown. */
  displayAnnualised: boolean;

  /** Conditional boolean that controls whether the potential earnings display should be shown. */
  displayPotentialEarnings: boolean;

  /** Conditional boolean that controls whether the complaints display should be shown. */
  displayComplaints: boolean;

  /** Conditional boolean that controls whether the pipelines display should be shown. */
  displayPipeline: boolean;

  /** Conditional boolean that controls whether the claims display should be shown. */
  displayClaims: boolean;

  /** Conditional boolean that controls whether the cancellations display should be shown. */
  displayCancellations: boolean;

  /** Conditional boolean that controls whether the arrears display should be shown. */
  displayArrears: boolean;

  /** Conditional boolean that controls whether the customers display should be shown. */
  displayCustomers: boolean;

  /** Conditional boolean that controls whether the products display should be shown. */
  displayProducts: boolean;

  /** Date percentage set as current day out of whole year as a percentage. */
  datePercentage = 0;

  /** Holds the data object of the current timestamp. */
  timestmp = new Date().setFullYear(new Date().getFullYear(), 0, 1);

  /** Holds the value of the first day of the year. */
  yearFirstDay = Math.floor(this.timestmp / 86400000);

  /** Gets the current date object. */
  today = Math.ceil(new Date().getTime() / 86400000);

  /** Based on the first day of the year returns the difference from the current day. */
  dayOfYear = this.today - this.yearFirstDay;

  /** The currently selected Tile name as a string. */
  selectedTile = "";

  /** Boolean conditional for whether the view is grid. */
  isGridView = true;

  /** Holds a reference to the static method utility class. */
  Utils = Utils;

  /** An array containing all the chart labels. */
  public doughnutChartLabels = [];
  /** An array containing all the chart data. */
  public doughnutChartData = [];
  /** An array containing all the chart section colors.  */
  public doughnutChartColors = [];
  /** The type of chart being used for chart.js. */
  public doughnutChartType = "pie";
  /** Configuration options for the chart. */
  public doughnutChartOptions = {
    animation: {
      duration: 1000,
      animateRotate: true
    },
    legend: { position: "bottom" },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    }
  };
  /** Promise to make sure chart data gets loaded before displaying. */
  doughnutDataLoaded: Promise<boolean>;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController,
    private filterService: FilterService,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  /**
   * Ionic lifecycle event on its display will be triggered to retrieve all enabled items with the use of the [[ApiService]] service.
   */
  async ionViewWillEnter() {
    this.eventId = +this.route.snapshot.params['id'];
    this.populateChartData();

    this.doughnutDataLoaded = Promise.resolve(true);
    // TEMPORARY - Only for demo purpose
    // TODO - This whole method it's temporary, it should be re-written and refactored when pointed to web services

    const TOP_LENGTH = 3;

    const loading = await this.loadingController.create({
      message: "Please wait..."
    });
    await loading.present();

    this.isGridView =
      localStorage.getItem("IS_GRID_VIEW_HOME_PAGE") !== "false";
    this.displayAnnualised = localStorage.getItem("ANNUALISED") !== "false";
    this.displayPotentialEarnings =
      localStorage.getItem("POTENTIAL_EARNINGS") !== "false";
    this.displayComplaints = localStorage.getItem("COMPLAINTS") !== "false";
    this.displayPipeline = localStorage.getItem("PIPELINE") !== "false";
    this.displayClaims = localStorage.getItem("CLAIMS") !== "false";
    this.displayCancellations =
      localStorage.getItem("CANCELLATIONS") !== "false";
    this.displayArrears = localStorage.getItem("ARREARS") !== "false";
    this.displayCustomers = localStorage.getItem("CUSTOMERS") !== "false";
    this.displayProducts = localStorage.getItem("PRODUCTS") !== "false";
    this.abstractElementList = [];

    // --------------------------------------------------
    // Pipeline
    // --------------------------------------------------
    const pipeElement = new ElementAbstractModel();
    pipeElement.elementName = "PIPELINE";
    pipeElement.elementDisplayName = "High Risk";
    pipeElement.iconName = "notifications-outline";
    pipeElement.tileColor = "dangertwo";
    pipeElement.subElementsList = [];

    this.apiService.getPipelines().subscribe(data => {
      pipeElement.numberOfItems = this.filterService.applyFilter(
        data.list
      ).length;
      this.potentialEarningsAmount = this.filterService
        .applyFilter(data.list)
        .reduce(
          (sum, current) =>
            sum + (current.monthlyPremiumValue1 + current.monthlyPremiumValue2),
          0
        );
      this.potentialEarningsAmount = this.potentialEarningsAmount * 12;

      // Good
      let pipeListGood = [];
      pipeListGood = this.filterService.applyFilter(data.list);
      pipeListGood = pipeListGood.filter(obj => obj.policyType === "Good");
      pipeListGood.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      pipeListGood.reverse();

      const topItemGoodList = [];
      for (const pipeGood of pipeListGood.slice(0, TOP_LENGTH)) {
        topItemGoodList.push(
          new ElementTopItemModel(
            pipeGood.policyNo,
            pipeGood.agentName,
            pipeGood.monthlyBenefitValue1 + pipeGood.monthlyBenefitValue2
          )
        );
      }
      pipeElement.subElementsList.push(
        new ElementAbstractDetModel(
          pipeListGood.length,
          pipeListGood.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Good",
          topItemGoodList
        )
      );

      // Bad
      let pipeListBad = [];
      pipeListBad = this.filterService.applyFilter(data.list);
      pipeListBad = pipeListBad.filter(obj => obj.policyType === "Bad");
      pipeListBad.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      pipeListBad.reverse();

      const topItemBadList = [];
      for (const pipeBad of pipeListBad.slice(0, TOP_LENGTH)) {
        topItemBadList.push(
          new ElementTopItemModel(
            pipeBad.policyNo,
            pipeBad.agentName,
            pipeBad.monthlyBenefitValue1 + pipeBad.monthlyBenefitValue2
          )
        );
      }
      pipeElement.subElementsList.push(
        new ElementAbstractDetModel(
          pipeListBad.length,
          pipeListBad.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Bad",
          topItemBadList
        )
      );
      pipeElement.subElementsList = [];
      pipeElement.subElementsList.push(
        new ElementAbstractDetModel(3, null, "High Risk", null)
      );
    });
    this.abstractElementList.push(pipeElement);

    // --------------------------------------------------
    // Complaint
    // --------------------------------------------------
    const complaintElement = new ElementAbstractModel();
    complaintElement.elementName = "COMPLAINTS";
    complaintElement.elementDisplayName = "Un-Assessed";
    complaintElement.iconName = "story";
    complaintElement.tileColor = "primary";
    complaintElement.subElementsList = [];

    this.apiService.getComplaints().subscribe(data => {
      const filteredComplaintList = this.filterService.applyFilter(data.list);
      filteredComplaintList.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      filteredComplaintList.reverse();

      complaintElement.numberOfItems = filteredComplaintList.length;

      const topItemComplaintList = [];
      for (const complaint of filteredComplaintList.slice(0, TOP_LENGTH)) {
        topItemComplaintList.push(
          new ElementTopItemModel(
            complaint.policyNo,
            complaint.agentName,
            complaint.monthlyBenefitValue1 + complaint.monthlyBenefitValue2
          )
        );
      }
      complaintElement.subElementsList.push(
        new ElementAbstractDetModel(
          filteredComplaintList.length,
          filteredComplaintList.reduce(
            (sum: number, current: ComplaintModel) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Open",
          topItemComplaintList
        )
      );

      complaintElement.subElementsList = [];
      complaintElement.subElementsList.push(
        new ElementAbstractDetModel(35, null, "Un-Assessed", null)
      );
    });
    this.abstractElementList.push(complaintElement);

    // --------------------------------------------------
    // Claims
    // --------------------------------------------------
    /*const claimsElement = new ElementAbstractModel();
    claimsElement.elementName = "CLAIMS";
    claimsElement.elementDisplayName = "Claims";
    claimsElement.iconName = "pie-chart";
    claimsElement.subElementsList = [];

    this.apiService.getClaims().subscribe(data => {
      claimsElement.numberOfItems = this.filterService.applyFilter(
        data.list
      ).length;

      // Notified
      let claimsNotified = [];
      claimsNotified = this.filterService.applyFilter(data.list);
      claimsNotified = claimsNotified.filter(
        obj => obj.policyStatus === "Notified"
      );
      claimsNotified.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      claimsNotified.reverse();

      const topItemNotifiedList = [];
      for (const claimNotified of claimsNotified.slice(0, TOP_LENGTH)) {
        topItemNotifiedList.push(
          new ElementTopItemModel(
            claimNotified.policyNo,
            claimNotified.agentName,
            claimNotified.monthlyBenefitValue1 +
              claimNotified.monthlyBenefitValue2
          )
        );
      }
      claimsElement.subElementsList.push(
        new ElementAbstractDetModel(
          claimsNotified.length,
          claimsNotified.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Notified",
          topItemNotifiedList
        )
      );

      // In Progress
      let claimsInProgress = [];
      claimsInProgress = this.filterService.applyFilter(data.list);
      claimsInProgress = claimsInProgress.filter(
        obj => obj.policyStatus === "In progress"
      );
      claimsInProgress.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      claimsInProgress.reverse();

      const topItemInProgressList = [];
      for (const claimInProgress of claimsInProgress.slice(0, TOP_LENGTH)) {
        topItemInProgressList.push(
          new ElementTopItemModel(
            claimInProgress.policyNo,
            claimInProgress.agentName,
            claimInProgress.monthlyBenefitValue1 +
              claimInProgress.monthlyBenefitValue2
          )
        );
      }
      claimsElement.subElementsList.push(
        new ElementAbstractDetModel(
          claimsInProgress.length,
          claimsInProgress.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "In Progress",
          topItemInProgressList
        )
      );

      // In Payment
      let claimsInPayment = [];
      claimsInPayment = this.filterService.applyFilter(data.list);
      claimsInPayment = claimsInPayment.filter(
        obj => obj.policyStatus === "In payment"
      );
      claimsInPayment.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      claimsInPayment.reverse();

      const topItemInPaymentList = [];
      for (const claimInPayment of claimsInPayment.slice(0, TOP_LENGTH)) {
        topItemInPaymentList.push(
          new ElementTopItemModel(
            claimInPayment.policyNo,
            claimInPayment.agentName,
            claimInPayment.monthlyBenefitValue1 +
              claimInPayment.monthlyBenefitValue2
          )
        );
      }
      claimsElement.subElementsList.push(
        new ElementAbstractDetModel(
          claimsInPayment.length,
          claimsInPayment.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "In Payment",
          topItemInPaymentList
        )
      );
    });
    this.abstractElementList.push(claimsElement);*/

    // --------------------------------------------------
    // Cancellations
    // --------------------------------------------------
    /*const cancellationsElement = new ElementAbstractModel();
    cancellationsElement.elementName = "CANCELLATIONS";
    cancellationsElement.elementDisplayName = "Cancellations";
    cancellationsElement.iconName = "clock";
    cancellationsElement.subElementsList = [];

    this.apiService.getCancellations().subscribe(data => {
      cancellationsElement.numberOfItems = this.filterService.applyFilter(
        data.list
      ).length;

      // Not Proceeded With
      let cancellationsNPW = [];
      cancellationsNPW = this.filterService.applyFilter(data.list);
      cancellationsNPW = cancellationsNPW.filter(
        obj => obj.cancellationReason === "Not proceeded with"
      );
      cancellationsNPW.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      cancellationsNPW.reverse();

      const topItemNPWList = [];
      for (const cancelNPW of cancellationsNPW.slice(0, TOP_LENGTH)) {
        topItemNPWList.push(
          new ElementTopItemModel(
            cancelNPW.policyNo,
            cancelNPW.agentName,
            cancelNPW.monthlyBenefitValue1 + cancelNPW.monthlyBenefitValue2
          )
        );
      }
      cancellationsElement.subElementsList.push(
        new ElementAbstractDetModel(
          cancellationsNPW.length,
          cancellationsNPW.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Not Proceeded With",
          topItemNPWList
        )
      );

      // Cooling Off
      let cancellationsCoolingOff = [];
      cancellationsCoolingOff = this.filterService.applyFilter(data.list);
      cancellationsCoolingOff = cancellationsCoolingOff.filter(
        obj => obj.cancellationReason === "Cooling off"
      );
      cancellationsCoolingOff.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      cancellationsCoolingOff.reverse();

      const topItemCoolingOffList = [];
      for (const cancelCoolingOff of cancellationsCoolingOff.slice(
        0,
        TOP_LENGTH
      )) {
        topItemCoolingOffList.push(
          new ElementTopItemModel(
            cancelCoolingOff.policyNo,
            cancelCoolingOff.agentName,
            cancelCoolingOff.monthlyBenefitValue1 +
              cancelCoolingOff.monthlyBenefitValue2
          )
        );
      }
      cancellationsElement.subElementsList.push(
        new ElementAbstractDetModel(
          cancellationsCoolingOff.length,
          cancellationsCoolingOff.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Cooling Off",
          topItemCoolingOffList
        )
      );

      // Lapse
      let cancellationsLapse = [];
      cancellationsLapse = this.filterService.applyFilter(data.list);
      cancellationsLapse = cancellationsLapse.filter(
        obj => obj.cancellationReason === "Lapse"
      );
      cancellationsLapse.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      cancellationsLapse.reverse();

      const topItemLapseList = [];
      for (const cancelLapse of cancellationsLapse.slice(0, TOP_LENGTH)) {
        topItemLapseList.push(
          new ElementTopItemModel(
            cancelLapse.policyNo,
            cancelLapse.agentName,
            cancelLapse.monthlyBenefitValue1 + cancelLapse.monthlyBenefitValue2
          )
        );
      }
      cancellationsElement.subElementsList.push(
        new ElementAbstractDetModel(
          cancellationsLapse.length,
          cancellationsLapse.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Lapse",
          topItemLapseList
        )
      );
    });
    this.abstractElementList.push(cancellationsElement);*/

    // --------------------------------------------------
    // Arrears
    // --------------------------------------------------
    /*const arrearsElement = new ElementAbstractModel();
    arrearsElement.elementName = "ARREARS";
    arrearsElement.elementDisplayName = "Arrears";
    arrearsElement.iconName = "pie-chart";
    arrearsElement.subElementsList = [];

    this.apiService.getArrears().subscribe(data => {
      console.log("Arrears :", data.list);
      arrearsElement.numberOfItems = this.filterService.applyFilter(
        data.list
      ).length;

      // One-off
      let arrearsOneOff = [];
      arrearsOneOff = this.filterService.applyFilter(data.list);
      console.log("arrearsOneOff :", arrearsOneOff);
      arrearsOneOff = arrearsOneOff.filter(
        obj => obj.arrearsLevel === "One-off"
      );
      arrearsOneOff.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      arrearsOneOff.reverse();
      console.log("arrearsOneOff :", arrearsOneOff);

      const topItemOneOffList = [];
      for (const oneOff of arrearsOneOff.slice(0, TOP_LENGTH)) {
        topItemOneOffList.push(
          new ElementTopItemModel(
            oneOff.policyNo,
            oneOff.agentName,
            oneOff.monthlyBenefitValue1 + oneOff.monthlyBenefitValue2
          )
        );
      }
      arrearsElement.subElementsList.push(
        new ElementAbstractDetModel(
          arrearsOneOff.length,
          arrearsOneOff.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "One-off",
          topItemOneOffList
        )
      );

      // Irregular
      let arrearsIrregular = [];
      arrearsIrregular = this.filterService.applyFilter(data.list);
      arrearsIrregular = arrearsIrregular.filter(
        obj => obj.arrearsLevel === "Irregular"
      );
      arrearsIrregular.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      arrearsIrregular.reverse();

      const topItemIrregularList = [];
      for (const irregular of arrearsIrregular.slice(0, TOP_LENGTH)) {
        topItemIrregularList.push(
          new ElementTopItemModel(
            irregular.policyNo,
            irregular.agentName,
            irregular.monthlyBenefitValue1 + irregular.monthlyBenefitValue2
          )
        );
      }
      arrearsElement.subElementsList.push(
        new ElementAbstractDetModel(
          arrearsIrregular.length,
          arrearsIrregular.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Irregular",
          topItemIrregularList
        )
      );

      // Regular
      let arrearsRegular = [];
      arrearsRegular = this.filterService.applyFilter(data.list);
      arrearsRegular = arrearsRegular.filter(
        obj => obj.arrearsLevel === "Regular"
      );
      arrearsRegular.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      arrearsRegular.reverse();

      const topItemRegularList = [];
      for (const regular of arrearsRegular.slice(0, TOP_LENGTH)) {
        topItemRegularList.push(
          new ElementTopItemModel(
            regular.policyNo,
            regular.agentName,
            regular.monthlyBenefitValue1 + regular.monthlyBenefitValue2
          )
        );
      }
      arrearsElement.subElementsList.push(
        new ElementAbstractDetModel(
          arrearsRegular.length,
          arrearsRegular.reduce(
            (sum, current) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Regular",
          topItemRegularList
        )
      );
    });
    this.abstractElementList.push(arrearsElement);*/

    // --------------------------------------------------
    // Customers
    // --------------------------------------------------
    const customersElement = new ElementAbstractModel();
    customersElement.elementName = "CUSTOMERS";
    customersElement.elementDisplayName = "Medium Risk";
    customersElement.iconName = "pie-chart";
    customersElement.tileColor = "warningtwo";
    customersElement.subElementsList = [];
    this.apiService.getCustomers().subscribe(data => {
      const filteredCustomerList = this.filterService.applyFilter(data.list);
      filteredCustomerList.sort(
        (a, b) =>
          a.monthlyBenefitValue1 +
          a.monthlyBenefitValue2 -
          (b.monthlyBenefitValue1 + b.monthlyBenefitValue2)
      );
      filteredCustomerList.reverse();

      customersElement.numberOfItems = filteredCustomerList.length;

      const topItemCustomerList = [];
      for (const customer of filteredCustomerList.slice(0, TOP_LENGTH)) {
        topItemCustomerList.push(
          new ElementTopItemModel(
            customer.policyNo,
            customer.agentName,
            customer.monthlyBenefitValue1 + customer.monthlyBenefitValue2
          )
        );
      }
      customersElement.subElementsList.push(
        new ElementAbstractDetModel(
          filteredCustomerList.length,
          filteredCustomerList.reduce(
            (sum: number, current: ComplaintModel) =>
              sum +
              (current.monthlyBenefitValue1 + current.monthlyBenefitValue2),
            0
          ),
          "Active",
          topItemCustomerList
        )
      );
      customersElement.subElementsList = [];
      customersElement.subElementsList.push(
        new ElementAbstractDetModel(15, null, "Medium Risk", null)
      );
    });
    this.abstractElementList.push(customersElement);

    // --------------------------------------------------
    // Products
    // --------------------------------------------------
    const productsElement = new ElementAbstractModel();
    productsElement.elementName = "PRODUCTS";
    productsElement.elementDisplayName = "Low Risk";
    productsElement.iconName = "pie-chart";
    productsElement.tileColor = "successtwo";
    productsElement.numberOfItems = 5;
    productsElement.subElementsList = [];
    productsElement.subElementsList.push(
      new ElementAbstractDetModel(47, null, "Un-Assessed", null)
    );
    this.abstractElementList.push(productsElement);

    // dismiss the loading after finish loading the data
    loading.dismiss();
  }

  /**
   * Making use of the variable.scss saved colors generates the percentage of each colour to be used.
   * @returns colour based on percentage condition
   */
  getColor() {
    const primary = getComputedStyle(document.documentElement).getPropertyValue(
      "--ion-color-primary"
    );
    const danger = getComputedStyle(document.documentElement).getPropertyValue(
      "--ion-color-danger"
    );

    this.datePercentage = (this.dayOfYear / 365) * 100;
    return this.annualPremiumPerc < this.datePercentage ? danger : primary;
  }

  /**
   * Displays error alert for failure to receiving top measure data.
   */
  async presentTopMeasuresAlert() {
    this.commonService.presentAlert(
      "Error While Getting Top Measures",
      "Please reload the app and try again.",
      ["OK"]
    );
  }

  /**
   * Displays error alert for failure to receiving element data.
   */
  async presentElementAlert() {
    this.commonService.presentAlert(
      "Error While Getting Elements",
      "Please reload the app and try again.",
      ["OK"]
    );
  }

  /**
   * Method to retrieve the path to be used.
   * @param element The current tile element being selected.
   * @returns string path to be used by routerlink
   */
  getCardRouterLink(element: ElementAbstractModel): string {
    return "/" + element.elementName.toLocaleLowerCase();
    // return element.dataSource !== 'BE' ? '/report' : '/' + element.elementName.toLocaleLowerCase();
  }

  /**
   * Method to retrieve the path of a JasperReport.
   * @param element The current tile element being selected.
   * @returns string path to be used by routerlink
   */
  getReportPath(element: ElementAbstractModel): string {
    return element.dataSource !== "BE"
      ? "{path:" + element.dataSource + "}"
      : "";
  }

  /**
   * Returns the status of whether a given element should be displayed based upon the provided name.
   * @param name The name of the element.
   * @returns boolean based upon the given names conditional field
   */
  isDisplayTile(name: string) {
    switch (name) {
      case "ANNUALISED": {
        return this.displayAnnualised;
      }
      case "POTENTIAL_EARNINGS": {
        return this.displayPotentialEarnings;
      }
      case "COMPLAINTS": {
        return this.displayComplaints;
      }
      case "PIPELINE": {
        return this.displayPipeline;
      }
      case "CLAIMS": {
        return this.displayClaims;
      }
      case "CANCELLATIONS": {
        return this.displayCancellations;
      }
      case "ARREARS": {
        return this.displayArrears;
      }
      case "CUSTOMERS": {
        return this.displayCustomers;
      }
      case "PRODUCTS": {
        return this.displayProducts;
      }
      default: {
        return false;
      }
    }
  }

  /**
   * Sets the selected tile into the selectedTile field.
   * @param tileName Name associated to the tile.
   */
  setSelectedTile(tileName: string) {
    if (this.selectedTile === tileName) {
      this.selectedTile = "";
    } else {
      this.selectedTile = tileName;
    }
  }

  /**
   * Sets isGridView field to the oposity value and saves on localStorage.
   */
  setGridView() {
    this.isGridView = !this.isGridView;
    localStorage.setItem("IS_GRID_VIEW_HOME_PAGE", String(this.isGridView));
  }

  private populateChartData() {
    this.doughnutChartLabels = ["High Risk", "Medium Risk", "Low Risk", "Un-Assessed"];
    this.doughnutChartData = [3, 15, 47, 35];
    this.doughnutChartColors = [{ backgroundColor: ["#f36565", "#ffd731", "#28e070", "#089ef5"] }];
  }


  /**
   * Refreshes the page to reload the data items.
   */
  onRefresher() {
    location.reload();
  }

}
