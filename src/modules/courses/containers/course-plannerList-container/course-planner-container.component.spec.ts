import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePlannerListContainerComponent } from './course-plannerList-container.component';

describe('CoursePlannerContainerComponent', () => {
  let component: CoursePlannerListContainerComponent;
  let fixture: ComponentFixture<CoursePlannerListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursePlannerListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePlannerListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
