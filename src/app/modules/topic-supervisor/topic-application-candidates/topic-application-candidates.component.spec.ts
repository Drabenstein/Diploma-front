import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicApplicationCandidatesComponent } from './topic-application-candidates.component';

describe('TopicApplicationCandidatesComponent', () => {
  let component: TopicApplicationCandidatesComponent;
  let fixture: ComponentFixture<TopicApplicationCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicApplicationCandidatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicApplicationCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
