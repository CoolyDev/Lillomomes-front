import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlannedCreateComponent } from './courses-planned-create.component';

describe('CoursesPlannerComponent', () => {
  let component: CoursesPlannedCreateComponent;
  let fixture: ComponentFixture<CoursesPlannedCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPlannedCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPlannedCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
