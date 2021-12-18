import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortmanCdmsComponent } from './portman-cdms.component';

describe('PortmanCdmsComponent', () => {
  let component: PortmanCdmsComponent;
  let fixture: ComponentFixture<PortmanCdmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortmanCdmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortmanCdmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
