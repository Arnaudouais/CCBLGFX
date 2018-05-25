import {Component, Input, OnInit} from '@angular/core';

import * as jsep from "jsep";

@Component({
  selector: 'lib-expr-parser',
  templateUrl: './expr-parser.component.html',
  styleUrls: ['./expr-parser.component.css']
})
export class ExprParserComponent implements OnInit {
  @Input() expression;
  @Input() class;
  @Input() varHover: (identifier: string) => void;

  private expressionParsed;
  private expressionType;
  private classes = [];

  constructor() { }

  ngOnInit() {
    this.varHover('');
    if (!this.expression) {
      return;
    }

    if (typeof this.expression === 'string') {
      this.expressionParsed = jsep(this.expression);
    } else {
      this.expressionParsed = this.expression;
    }

    this.expressionType = this.expressionParsed.type;

    this.classes.push(this.expressionType);
    if (this.class) {
      this.classes.push(this.class);
    }
  }
}
