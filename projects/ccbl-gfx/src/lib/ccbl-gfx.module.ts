import { NgModule } from '@angular/core';
import { CcblGfxComponent } from './ccbl-gfx.component';
import {ContextComponent} from './context/context.component';
import {BrowserModule} from '@angular/platform-browser';
import { ExprParserComponent } from './expr-parser/expr-parser.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CcblGfxComponent,
    ContextComponent,
    ExprParserComponent
  ],
  exports: [CcblGfxComponent]
})
export class CcblGfxModule { }
