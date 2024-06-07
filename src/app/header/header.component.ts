import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../auth/state/auth.selector';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  handleLogin : boolean;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(isAuthenticated).subscribe((res) => {
      this.handleLogin = res;
    })
  }

}
