import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CcblGfxComponent} from '../../projects/ccbl-gfx/src/lib/ccbl-gfx.component';
import {CcblGfxModule} from '../../projects/ccbl-gfx/src/lib/ccbl-gfx.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CcblGfxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
