import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../state/auth.state';
import { loginStart } from '../state/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { getloading } from 'src/app/store/shared/shared.selector';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm : FormGroup;

  constructor(private store : Store<AppState> ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email : new FormControl("", [Validators.required,Validators.email]),
      password : new FormControl("", [Validators.required])
    })
  }

  onLoginFormSubmit() {
   // console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.store.dispatch(setLoadingSpinner({status : true}));

    this.store.dispatch(loginStart({email,password}));

  }
}
