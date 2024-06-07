import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroinment/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  login(email:string,password:string) : Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase_api_key}`,
    {email,password,returnSecureToken :true})
  }

  signup(email:string,password:string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase_api_key}`,
    {email,password,returnSecureToken :true})
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
