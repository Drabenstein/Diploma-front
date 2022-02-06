import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTopicListComponent } from './supervisor-topic-list.component';

describe('SupervisorTopicListComponent', () => {
  let component: SupervisorTopicListComponent;
  let fixture: ComponentFixture<SupervisorTopicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorTopicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
