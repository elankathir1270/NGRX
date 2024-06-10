import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroinment/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { autoLogout } from '../auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private store : Store<AppState>) { }

  timeOutInterval : any;

  login(email:string,password:string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase_api_key}`,
    {email,password,returnSecureToken :true})
  }

  signup(email:string,password:string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase_api_key}`,
    {email,password,returnSecureToken :true})
  }

  setUserInLocalStorage(user : User) {

    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeOutInterval(user)

  }

  runTimeOutInterval(user : User){
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeOutInterval = setTimeout(() => {
     this.store.dispatch(autoLogout());
    },timeInterval)
  }

  getUserInLocalStorage() {
    const userDataString = localStorage.getItem('userData')

    if(userDataString) {
      const userData = JSON.parse(userDataString)
      const expirationDate = new Date(userData.expirationDate)
      const user = new User(userData.email,userData.token,userData.localId,expirationDate)
      this.runTimeOutInterval(user);
      return user
    }
    return null
  }

  logout() {
    localStorage.removeItem('userData');

    if(this.timeOutInterval) {
      clearInterval(this.timeOutInterval);
      this.timeOutInterval = null;
    }
  }

  formatData(data: AuthResponseData) {

    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)

    const user = new User(data.email,data.idToken,data.localId,expirationDate)
    return user;
  }

  getErrorMessage(message : string) {

    switch(message) {
      case 'EMAIL_NOT_FOUND' :
      return "Email not found";
      case 'INVALID_PASSWORD' :
      return " Invalid password";
      case 'EMAIL_EXISTS' :
      return "Email already exist";
      default :
      return "Unknown error occurred"
    }
  }
}
