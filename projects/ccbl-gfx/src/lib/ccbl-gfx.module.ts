import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CcblGfxComponent } from './ccbl-gfx.component';
import {ContextComponent} from './context/context.component';
import {BrowserModule} from '@angular/platform-browser';
import { ExprParserComponent } from './expr-parser/expr-parser.component';
import {FormsModule} from "@angular/forms";
import { VarSelectDialogComponent } from './var-select-dialog/var-select-dialog.component';
import {CcblGfxService} from "./ccbl-gfx.service";
import {MatDialogModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DragulaModule} from "ng2-dragula";
import {MDBBootstrapModule} from "angular-bootstrap-md";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    DragulaModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    CcblGfxComponent,
    ContextComponent,
    ExprParserComponent,
    VarSelectDialogComponent
  ],
  entryComponents: [VarSelectDialogComponent],
  exports: [CcblGfxComponent],
  providers: [CcblGfxService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CcblGfxModule { }
