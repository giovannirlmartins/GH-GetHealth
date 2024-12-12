import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpProfessionalComponent } from './sign-up-professional.component';

describe('SignUpProfessionalComponent', () => {
  let component: SignUpProfessionalComponent;
  let fixture: ComponentFixture<SignUpProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpProfessionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
