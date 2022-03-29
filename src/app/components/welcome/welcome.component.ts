import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public title=''
  
  constructor() {
    console.log('constructor');
    
  }
 
  ngOnChanges(changes: SimpleChanges): void {
      console.log('on changes' + changes);
      
  }
  
  ngOnInit(): void {
    console.log('on init');
  }

  ngOnDestroy(): void {
    console.log('on destroy');
  }
}
