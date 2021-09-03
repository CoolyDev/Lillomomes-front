import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlannerContainerComponent } from './courses-planner-container.component';

describe('CoursesPlannerContainerComponent', () => {
  let component: CoursesPlannerContainerComponent;
  let fixture: ComponentFixture<CoursesPlannerContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPlannerContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPlannerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
