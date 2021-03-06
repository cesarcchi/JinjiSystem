import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';




@Component({
  selector: 'app-displaydate',
  templateUrl: './displaydate.component.html',
  styleUrls: ['./displaydate.component.css']
})
export class DisplaydateComponent implements OnInit {

  settings: Moment

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  now: String = new Date().toLocaleDateString('ja-JP', this.options)

  

  constructor() { 
    
    
  }


  ngOnInit() {
    
    
  }

}
