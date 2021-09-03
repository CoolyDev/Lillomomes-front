import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlannedDetailsContainerComponent } from './courses-planned-details-container.component';

describe('CoursesPlannedDetailsContainerComponent', () => {
  let component: CoursesPlannedDetailsContainerComponent;
  let fixture: ComponentFixture<CoursesPlannedDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesPlannedDetailsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPlannedDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
