import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThesisReviewComponent } from './student-thesis-review.component';

describe('StudentThesisReviewComponent', () => {
  let component: StudentThesisReviewComponent;
  let fixture: ComponentFixture<StudentThesisReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentThesisReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThesisReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
