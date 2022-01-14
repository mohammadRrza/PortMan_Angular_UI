import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdrPageInfoComponent } from './ddr-page-info.component';

describe('DdrPageInfoComponent', () => {
  let component: DdrPageInfoComponent;
  let fixture: ComponentFixture<DdrPageInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdrPageInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdrPageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
