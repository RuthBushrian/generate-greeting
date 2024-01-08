// generate-greeting.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generate-greeting',
  styleUrls: ['./generate-greeting.component.css'], 
  templateUrl: './generate-greeting.component.html'
})
export class GenerateGreetingComponent {
  myForm: FormGroup;
  showAgeInput = false;
  showHobbiesInput = false;
  showJobInput = false;
  showAspirationsInput = false;
  greetingTypes = ['Song', 'Long Letter', 'Short Letter'];
  eventTypes = ['Birthday', 'New Job'];
  greetings: string[] = [];
  selectedGreetingIndex = 0;
  showInputs = true;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      greetingType: ['', Validators.required],
      atmosphere: ['', Validators.required],
      from: ['', Validators.required],
      eventType: ['', Validators.required],
      age: [''],
      hobbies: [''],
      job: [''],
      aspirations: [''],
    });
  }

  onEventTypeChange() {
    const eventTypeControl = this.myForm.get('eventType');

    if (eventTypeControl) {
      const eventType = eventTypeControl.value;

      // Reset and hide all additional inputs
      this.showAgeInput = false;
      this.showHobbiesInput = false;
      this.showJobInput = false;
      this.showAspirationsInput = false;

      // Show additional inputs based on event type
      if (eventType === 'Birthday') {
        this.showAgeInput = true;
        this.showHobbiesInput = true;
      } else if (eventType === 'New Job') {
        this.showJobInput = true;
        this.showAspirationsInput = true;
      }
    }
  }

  generateGreeting() {
    if (this.myForm.valid) {

      this.showInputs = false;
      if (this.myForm) {
        const data = {
          event: this.myForm.get('eventType')?.value,
          name: this.myForm.get('name')?.value,
          greetingType: this.myForm.get('greetingType')?.value,
          atmosphere: this.myForm.get('atmosphere')?.value,
          from: this.myForm.get('from')?.value,
          details: {
            age: this.myForm.get('age')?.value,
            favoriteHobbies: this.myForm.get('hobbies')?.value,
            job: this.myForm.get('job')?.value,
            aspirations: this.myForm.get('aspirations')?.value,
          },
        };

        this.greetings = ["waiting to response..."];
        this.selectedGreetingIndex = 0;

        this.http.post<any>('http://localhost:3000/generateGreeting', data).subscribe((response) => {
        console.log(response.greetings);
          
        this.greetings = response.greetings;
          this.selectedGreetingIndex = 0;
        });
      }
    }
    else {
      this.myForm.get('name')?.markAsTouched();
      this.myForm.get('greetingType')?.markAsTouched();
      this.myForm.get('atmosphere')?.markAsTouched();
      this.myForm.get('from')?.markAsTouched();
      this.myForm.get('eventType')?.markAsTouched();
    }
  }

  changeGreeting() {
    this.selectedGreetingIndex = (this.selectedGreetingIndex + 1) % this.greetings.length;
  }
}
