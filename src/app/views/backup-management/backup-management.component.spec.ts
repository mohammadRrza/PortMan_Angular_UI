import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupManagementComponent } from './backup-management.component';

describe('BackupManagementComponent', () => {
  let component: BackupManagementComponent;
  let fixture: ComponentFixture<BackupManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackupManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
