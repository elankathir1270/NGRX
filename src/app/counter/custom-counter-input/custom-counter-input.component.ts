import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { counterText, customIncrement } from '../state/counter.actions';
import { getCounterText } from '../state/counter.selector';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent {

  counterValue: number;
  conterText: string;

  constructor(private store : Store<{counter: CounterState}>) {}

  ngOnInit() {
    this.store.select(getCounterText).subscribe((counterText) => {
      console.log("check counter text");

      this.conterText = counterText;
    })
  }

  onCustomIncrement() {
    this.store.dispatch(customIncrement({value : +this.counterValue}));
  }

  onTextUpdate(){
    this.store.dispatch(counterText())
  }

}
