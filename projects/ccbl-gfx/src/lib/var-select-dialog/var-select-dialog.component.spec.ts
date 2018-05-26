import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarSelectDialogComponent } from './var-select-dialog.component';

describe('VarSelectDialogComponent', () => {
  let component: VarSelectDialogComponent;
  let fixture: ComponentFixture<VarSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
