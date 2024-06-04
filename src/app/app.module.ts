import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter/counter.component';
import { CounterButtonsComponent } from './counter/counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/state/counter.reducer';
import { CustomCounterInputComponent } from './counter/custom-counter-input/custom-counter-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.state';
import { AddPostComponent } from './post/add-post/add-post.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterButtonsComponent,
    CounterOutputComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostlistComponent,
    AddPostComponent,
    UpdatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      //maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      //connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
