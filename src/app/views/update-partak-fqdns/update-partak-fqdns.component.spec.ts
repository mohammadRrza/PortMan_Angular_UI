import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePartakFqdnsComponent } from './update-partak-fqdns.component';

describe('UpdatePartakFqdnsComponent', () => {
  let component: UpdatePartakFqdnsComponent;
  let fixture: ComponentFixture<UpdatePartakFqdnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePartakFqdnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePartakFqdnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
