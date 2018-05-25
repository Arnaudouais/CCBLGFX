import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprParserComponent } from './expr-parser.component';

describe('ExprParserComponent', () => {
  let component: ExprParserComponent;
  let fixture: ComponentFixture<ExprParserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
