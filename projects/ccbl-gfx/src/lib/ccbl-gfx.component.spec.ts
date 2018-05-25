import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcblGfxComponent } from './ccbl-gfx.component';

describe('CcblGfxComponent', () => {
  let component: CcblGfxComponent;
  let fixture: ComponentFixture<CcblGfxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcblGfxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcblGfxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
