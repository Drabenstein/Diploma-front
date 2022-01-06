import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonExistingPageComponent } from './non-existing-page.component';

describe('NonExistingPageComponent', () => {
  let component: NonExistingPageComponent;
  let fixture: ComponentFixture<NonExistingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonExistingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonExistingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
