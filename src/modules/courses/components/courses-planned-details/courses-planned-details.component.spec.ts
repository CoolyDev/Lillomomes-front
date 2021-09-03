import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlannedDetailsComponent } from './courses-planned-details.component';

describe('CoursesPlannedDetailsComponent', () => {
  let component: CoursesPlannedDetailsComponent;
  let fixture: ComponentFixture<CoursesPlannedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPlannedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPlannedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
