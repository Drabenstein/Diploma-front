import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeclarationComponent } from './student-declaration.component';

describe('StudentDeclarationComponent', () => {
  let component: StudentDeclarationComponent;
  let fixture: ComponentFixture<StudentDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
