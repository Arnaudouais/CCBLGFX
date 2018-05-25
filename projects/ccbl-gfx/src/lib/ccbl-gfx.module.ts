import { NgModule } from '@angular/core';
import { CcblGfxComponent } from './ccbl-gfx.component';
import {ContextComponent} from './context/context.component';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    CcblGfxComponent,
    ContextComponent
  ],
  exports: [CcblGfxComponent]
})
export class CcblGfxModule { }
