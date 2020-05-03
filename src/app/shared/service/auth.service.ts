// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import * as jwt_decode from 'jwt-decode';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from 'src/environments/environment';

// import { TokenModel } from '../model/token.model';
// import { BASE_PATH } from '../constants/api.constants';
// import { Router } from '@angular/router';
// import { ProfileModel } from '../model/profile.model';

// const JWT_HELPER = new JwtHelperService();

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: any) {
//     return this.http.post<TokenModel>(
//       environment.API_SERVER + BASE_PATH + `/security/public/login`,
//       credentials
//     );
//   }

//   // token management
//   public setToken(token: any) {
//     localStorage.setItem('token', JSON.stringify(token));
//   }

//   public getToken(): TokenModel {
//     return JSON.parse(localStorage.getItem('token'));
//   }

//   public clearToken() {
//     localStorage.removeItem('token');
//   }

//   public isAuthenticated(): boolean {
//     const token = this.getToken();
//     if (token) {
//       return !JWT_HELPER.isTokenExpired(token.access_token);
//     } else {
//       return false;
//     }
//   }

//   public logOut() {
//     this.clearToken();
//     this.router.navigateByUrl('/login');
//   }

//   public getDecodedAccessToken(): any {
//     try {
//       return jwt_decode(this.getToken().access_token);
//     } catch (Error) {
//       return null;
//     }
//   }
//   public changePassword(profileModel: ProfileModel, id: string) {
//     return this.http.put(
//       BASE_PATH + `/security/public/user/password/` + environment.API_SERVER + `/${id}`,
//       profileModel
//     );
//   }
// }
