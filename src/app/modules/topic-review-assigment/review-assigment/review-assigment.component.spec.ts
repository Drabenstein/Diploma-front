import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAssigmentComponent } from './review-assigment.component';

describe('ReviewAssigmentComponent', () => {
  let component: ReviewAssigmentComponent;
  let fixture: ComponentFixture<ReviewAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAssigmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
