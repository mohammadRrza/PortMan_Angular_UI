import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PishgamanNoteComponent } from './pishgaman-note.component';

describe('PishgamanNoteComponent', () => {
  let component: PishgamanNoteComponent;
  let fixture: ComponentFixture<PishgamanNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PishgamanNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PishgamanNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
