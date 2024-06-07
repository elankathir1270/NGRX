import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { signupStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm : FormGroup

  constructor(private store: Store<AppState>){}

  ngOnInit() {
    this.signupForm = new FormGroup({
      email : new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
    })
  }

  onSignupFormSubmit() {
    //console.log(this.signupForm.value);

    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(signupStart({email,password}));

  }

}
