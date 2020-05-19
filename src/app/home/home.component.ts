import { Component, OnInit, EventEmitter, Output } from '@angular/core';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  state = 'normal';
  @Output() featureSelected= new EventEmitter<string>();


  onSelect(feature: string)
  {
      this.featureSelected.emit(feature);
      console.log(this.state);

  }


  constructor() { }

  ngOnInit(): void {

  }

}
