import {Component, Input, OnInit} from '@angular/core';

import * as jsep_ from "jsep";
import {ContextComponent} from "../context/context.component";

let jsep: any = (<any>jsep_).default || jsep_;

@Component({
  selector: 'lib-expr-parser',
  templateUrl: './expr-parser.component.html',
  styleUrls: ['./expr-parser.component.css']
})
export class ExprParserComponent implements OnInit {
  @Input() expression;
  @Input() class;
  @Input() parent: ExprParserComponent;
  @Input() context: ContextComponent;

  expressionParsed;
  expressionType;
  classes = [];

  constructor() { }

  ngOnInit() {
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

  hoverOn(name: string) {
    if (!this.parent) {
      this.context.hoverOn(name);
    } else {
      this.parent.hoverOn(name);
    }
  }

  get _this() {
    return this;
  }
}
