import { Component, OnInit } from '@angular/core';
import { NoticeModel } from 'src/app/shared/model/notice.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/shared/service/common.service';

/**
 * Page that displays as a modal for notice creation.
 */
@Component({
  selector: 'app-notices-modal',
  templateUrl: './notices_modal.page.html',
  styleUrls: ['./notices_modal.page.scss'],
})
export class NoticesModalPage implements OnInit {

  /** Holds a reference for the notice type NoticeModel. */
  noticeModel: NoticeModel;

  /** FormGroup object used for reactiveForms validation. */
  noticeForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private commonService: CommonService
  ) { }

  /**
   * On initialisation creates the form group for the notice modal page.
   */
  ngOnInit() {
    this.createFormGroup();
  }

  /**
   * Allows for the dismissal of the modal page.
   */
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  /**
   * Submits a notice checking validity of form beforehand following a message to show status of notice sent.
   */
  submitNotice() {
    this.commonService.markFormGroupTouched(this.noticeForm);
    if (this.noticeForm.valid) {

      let noticeList: Array<NoticeModel> = JSON.parse(localStorage.getItem('noticeList'));
      if (!noticeList) {
        noticeList = new Array<NoticeModel>();
      }

      // capture and set the description
      this.noticeModel.noticeDescription = this.noticeForm.value.noticeDescription;

      // save the notice
      noticeList.push(this.noticeModel);
      localStorage.setItem('noticeList', JSON.stringify(noticeList));

      // closing modal after data storage
      this.modalCtrl.dismiss();

      // create a success fadeout message on notice submit
      this.commonService.presentToast('Notice successfully submitted!', 'success');

    }
  }

  /**
   * Method uses to attach the required validators onto the forms inputs.
   */
  createFormGroup() {
    this.noticeForm = new FormGroup({
      noticeDescription: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

}
