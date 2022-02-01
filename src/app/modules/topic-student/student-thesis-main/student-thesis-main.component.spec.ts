import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThesisMainComponent } from './student-thesis-main.component';

describe('StudentThesisMainComponent', () => {
  let component: StudentThesisMainComponent;
  let fixture: ComponentFixture<StudentThesisMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentThesisMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThesisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
