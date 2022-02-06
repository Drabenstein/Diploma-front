import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicProposeComponent } from './topic-propose.component';

describe('TopicProposeComponent', () => {
  let component: TopicProposeComponent;
  let fixture: ComponentFixture<TopicProposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicProposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
