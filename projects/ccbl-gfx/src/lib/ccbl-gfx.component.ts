import {Component} from '@angular/core';
import {HumanReadableProgram} from 'ccbl-js/ProgramObjectInterface';
import {ContextComponent} from './context/context.component';
import {CcblGfxService} from "./ccbl-gfx.service";

@Component({
  selector: 'lib-ccbl-gfx',
  templateUrl: 'ccbl-gfx.component.html',
  styles: [`
    .hover {background-color: hsla(0, 50%, 0%, .2);}
  `]
})
export class CcblGfxComponent {
  hrp: HumanReadableProgram;
  selectedContext: ContextComponent;
  hover = '';

  constructor(private ccblGfxService: CcblGfxService) {
    this.ccblGfxService.addObserver(this.programChanged.bind(this));
  }

  programChanged(p: HumanReadableProgram): void {
    this.hrp = p;
  }

  select(c: ContextComponent): void {
    if (this.selectedContext) {
      this.selectedContext.unselect();
    }
    this.selectedContext = c;
  }

  varHover(identifier: string): void {
    this.hover = identifier;
  }

  get selectBinded() {
    return this.select.bind(this);
  }

  get varHoverBinded() {
    return this.varHover.bind(this);
  }
}
