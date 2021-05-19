import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortMapComponent } from './port-map.component';

describe('PortMapComponent', () => {
  let component: PortMapComponent;
  let fixture: ComponentFixture<PortMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
