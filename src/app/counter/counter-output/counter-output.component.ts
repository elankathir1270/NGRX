import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable } from 'rxjs';
import { getCounter } from '../state/counter.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent {

  counter: number;
  counter$ : Observable<{counter : number}>;

  constructor(private store : Store<CounterState>) {}

  ngOnInit() {

    this.store.select(getCounter).subscribe((counterNumber) => {
      console.log("check counter number");

      this.counter = counterNumber;
    })

    //this.counter$ = this.store.select('counter');
  }

}
