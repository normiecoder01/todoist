import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskManagementComponent } from './user-task-management.component';

describe('UserTaskManagementComponent', () => {
  let component: UserTaskManagementComponent;
  let fixture: ComponentFixture<UserTaskManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTaskManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
