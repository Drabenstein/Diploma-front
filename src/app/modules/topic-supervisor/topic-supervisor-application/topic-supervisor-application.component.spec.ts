import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSupervisorApplicationComponent } from './topic-supervisor-application.component';

describe('TopicSupervisorApplicationComponent', () => {
  let component: TopicSupervisorApplicationComponent;
  let fixture: ComponentFixture<TopicSupervisorApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicSupervisorApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSupervisorApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
