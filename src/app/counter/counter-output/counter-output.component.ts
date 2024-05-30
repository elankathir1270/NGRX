import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent {

  counter: number;

  constructor(private store : Store<{counter : {counter : number}}>) {}

  ngOnInit() {
    this.store.select('counter').subscribe((data) => {
      this.counter = data.counter;
    })
  }

}
