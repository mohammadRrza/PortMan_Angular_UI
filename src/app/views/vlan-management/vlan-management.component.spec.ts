import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VlanManagementComponent } from './vlan-management.component';

describe('VlanManagementComponent', () => {
  let component: VlanManagementComponent;
  let fixture: ComponentFixture<VlanManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VlanManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VlanManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
