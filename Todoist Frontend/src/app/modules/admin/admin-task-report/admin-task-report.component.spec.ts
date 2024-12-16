import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskReportComponent } from './admin-task-report.component';

describe('AdminTaskReportComponent', () => {
  let component: AdminTaskReportComponent;
  let fixture: ComponentFixture<AdminTaskReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTaskReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTaskReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
