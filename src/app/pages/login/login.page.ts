import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

/**
 * Login page which makes use of the [[AuthService]] service with the use of KeyCloak authentication.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  /** Field that holds the username. */
  username = 'user@mail.com';
  /** Field that holds the password. */
  password = 'your-password';
  fromRegister: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController
  ) {}

  async ionViewWillEnter() {
    console.log('login');
    this.fromRegister = this.route.snapshot.params['fromRegister'] === 'true';
    if (this.fromRegister) {
      this.presentRegisterSuccess();
    }
    console.log('this.fromRegister :>> ', this.fromRegister);
  }

  ngOnInit(): void {}

  async presentRegisterSuccess() {
    const toast = await this.toastController.create({
      message: 'Registration Successful!.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  /**
   *  On successful login will navigate to the home screen.
   */
  async onLogin() {
    this.router.navigateByUrl('/home/tabs/events');
  }

  /** Removes any chances of memory leaks from subscriptions and clears sessionStorage on navigation to another page */
  ngOnDestroy(): void {
    // unsubscribe
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
