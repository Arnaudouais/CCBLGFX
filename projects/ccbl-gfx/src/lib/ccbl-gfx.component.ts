import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {HumanReadableProgram} from 'ccbl-js/ProgramObjectInterface';
import {ContextComponent} from './context/context.component';
import {CcblGfxService} from "./ccbl-gfx.service";
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'lib-ccbl-gfx',
  styleUrls: ['ccbl-gfx.component.scss'],
  templateUrl: 'ccbl-gfx.component.html'
})
export class CcblGfxComponent implements AfterViewInit, OnInit {
  hrp: HumanReadableProgram;
  selectedContext: ContextComponent;
  hover = '';
  importEdits = {
    channels : Array,
    emitters : Array,
  };

  pile: HumanReadableProgram[] = [];
  index: number;

  constructor(private ccblGfxService: CcblGfxService, private dragulaService: DragulaService) {
    this.ccblGfxService.addObserver(this.programChanged.bind(this));
    this.dragulaService.setOptions('bag', {
      moves: function (el: any, container: any, handle: any): any {
        return !el.firstChild.classList.contains('undraggable') /*&& (el.firstChild.distanceDragged() > el.firstChild.d_drag)*/;
      },
      invalid: function (el, handle) {
        const b = !el.classList.contains('context-drag');
        return handle.classList.contains('undraggable') || handle.classList.contains('btn');
      }
    });

  }

  ngAfterViewInit(): void {
    this.pile.push(JSON.parse(JSON.stringify(this.hrp)));
    this.index = 0;
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'z' && event.ctrlKey) {
      if (this.index < 1) return;

      this.hrp = JSON.parse(JSON.stringify(this.pile[--this.index]));
    } else if (event.key === 'y' && event.ctrlKey) {
      if (this.index + 2 > this.pile.length) return;

      this.hrp = JSON.parse(JSON.stringify(this.pile[++this.index]));
    }
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

  hoverOn(name: string): void {
    this.hover = name;
  }

  get _this() {
    return this;
  }

  onEdit() {

    const hrpc = JSON.parse(JSON.stringify(this.hrp));
    if (this.pile.length - (this.index + 1) > 0) {
      this.pile.splice(this.index + 1, this.pile.length - this.index - 1);
    }

    this.pile.push(hrpc);
    this.index++;

  }

  ngOnInit(): void {
    // this.hrp.dependencies.import.channels.forEach(c=> this.importEdits.channels.add);
    // this.hrp.dependencies.import.channels.
  }

}
