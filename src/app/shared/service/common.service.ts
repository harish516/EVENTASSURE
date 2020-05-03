import { Injectable } from '@angular/core';
import { ToastController, ModalController, AlertController, PopoverController, LoadingController } from '@ionic/angular';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ComponentRef } from '@ionic/core';
import { AdviserPage } from 'src/app/pages/adviser/adviser.page';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController
  ) { }

  sendEmail(mailTo: string, subject: string, body: string) {
    window.location.href = 'mailto:' + mailTo + '?subject=' + subject + '&body=' + body;
  }

  call(phoneNo: string) {
    window.location.href = 'tel:' + phoneNo;
  }

  presentToast(msgToDisplay: string, colorName: string) {
    this.toastController.create({
      message: msgToDisplay,
      duration: 3000,
      position: 'bottom',
      color: colorName,
      buttons: [
        {
          text: 'X',
          role: 'cancel'
        }
      ]
    }).then((toastData) => {
      toastData.present();
    });
  }

  async presentAlert(alertHeader: string, alertMessage: string, alertButtons: string[]) {
    const alert = await this.alertCtrl.create({
      header: alertHeader,
      message: alertMessage,
      buttons: alertButtons
    });
    await alert.present();
  }

  createModal(componentPage: ComponentRef, showModalBackDrop: boolean, data?: {}, cssModalClass?: string) {
    return this.modalCtrl.create({
      component: componentPage,
      showBackdrop: showModalBackDrop,
      cssClass: cssModalClass,
      componentProps: data
    });
  }

  createPopover(componentPage: ComponentRef, showCompBackDrop: boolean, compEvent: Event, compProps: {}) {
    return this.popoverCtrl.create({
      component: componentPage,
      showBackdrop: showCompBackDrop,
      event: compEvent,
      translucent: true,
      componentProps: compProps
    });
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The form group to touch
   */
  markFormGroupTouched<T extends AbstractControl>(formGroup: FormGroup) {
    (Object as any).values(formGroup.controls).forEach((
      control: T) => {
      if (control instanceof FormGroup) { // control is a FormGroup
        this.markFormGroupTouched(control);
      } else { // control is a FormControl
        control.markAsTouched();
      }
    });
  }

  async loadingWrap<T, S extends Function>(event: CustomEvent, thisObject: T, fn: S, ...args: any[]) {

    // pre-call check for multi click before initiating loadingController
    if (!event.detail || event.detail == 1) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
      });
      await loading.present();

      // apply function with its params
      fn.apply(thisObject, Array.prototype.slice.call(args));

      // post-call dismiss loadingController
      loading.dismiss();
    }
    
  }

}