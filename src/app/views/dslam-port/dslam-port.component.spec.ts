import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DslamPortComponent } from './dslam-port.component';

describe('DslamPortComponent', () => {
  let component: DslamPortComponent;
  let fixture: ComponentFixture<DslamPortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DslamPortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DslamPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
