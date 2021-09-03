import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlannedListComponent } from './courses-planned-list.component';

describe('CoursesPlannerListComponent', () => {
  let component: CoursesPlannedListComponent;
  let fixture: ComponentFixture<CoursesPlannedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPlannedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPlannedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
