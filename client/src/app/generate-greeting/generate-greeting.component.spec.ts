import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGreetingComponent } from './generate-greeting.component';

describe('GenerateGreetingComponent', () => {
  let component: GenerateGreetingComponent;
  let fixture: ComponentFixture<GenerateGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateGreetingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
