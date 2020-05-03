// import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from '../service/auth.service';
// import { BASE_PATH } from '../constants/api.constants';
// import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private alertController: AlertController
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     if ((!request.url.endsWith('login'))
//           && (request.url.includes(BASE_PATH))) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${this.authService.getToken().access_token}`
//         }
//       });
//     }

//     return next.handle(request)
//     .pipe(
//       catchError(error => {

//         // redirect to login page, case token expire
//         if ((error.status === 401) && (!request.url.endsWith('login'))) {
//           this.presentTimeoutAlert();
//           this.router.navigateByUrl('/', {replaceUrl: true});
//         }

//         return throwError(error);
//       })
//     );

//   }

//   async presentTimeoutAlert() {
//     const alert = await this.alertController.create({
//       header: 'Login Security Timeout',
//       message: 'Please login again.',
//       buttons: ['OK']
//     });
//     await alert.present();
//   }
// }
