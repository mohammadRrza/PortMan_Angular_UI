import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelecomCostsComponent } from './telecom-costs.component';

describe('TelecomCostsComponent', () => {
  let component: TelecomCostsComponent;
  let fixture: ComponentFixture<TelecomCostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelecomCostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelecomCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
