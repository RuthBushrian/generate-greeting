import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.css']
})
export class InsertDataComponent implements OnInit {

  isBirthday: boolean = false;
  isNewJob: boolean = false;


  frmGreeting: FormGroup = new FormGroup({
    event: new FormControl(Option, Validators.required),
    name: new FormControl('', Validators.required),
    greetingType: new FormControl('', Validators.required),
    atmosphere: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    favoriteHobbies: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    aspiration: new FormControl('', Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
  }


  IsBirthday(){
    this.isBirthday=true;
  }

}


