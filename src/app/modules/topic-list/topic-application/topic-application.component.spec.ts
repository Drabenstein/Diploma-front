import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicApplicationComponent } from './topic-application.component';

describe('TopicApplicationComponent', () => {
  let component: TopicApplicationComponent;
  let fixture: ComponentFixture<TopicApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
