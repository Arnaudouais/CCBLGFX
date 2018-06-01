import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {AllenRelationships, ContextOrProgram, HumanReadableProgram, HumanReadableStateContext} from 'ccbl-js/ProgramObjectInterface';
import {ContextComponent} from './context/context.component';
import {CcblGfxService} from "./ccbl-gfx.service";
import {DragulaService} from 'ng2-dragula';
import {updateForIn} from 'tsickle/src/typescript-2.4';

// export declare type ContextOrProgramInfos = {
//   editing: boolean;
//   visible: boolean;
//   allen?: AllenGraphicalInfos;
// };
//
// export declare type AllenGraphicalInfos = {
//   During?: ContextOrProgramInfos[];
//   StartWith?: ContextOrProgramInfos[];
//   EndWith?: ContextOrProgramInfos[];
// };
//
// export declare type HRPGraphicalInfos = {
//   editing: boolean;
//   visible: boolean;
//   allen?: AllenGraphicalInfos;
// };

@Component({
  selector: 'lib-ccbl-gfx',
  styleUrls: ['ccbl-gfx.component.scss'],
  templateUrl: 'ccbl-gfx.component.html'
})

export class CcblGfxComponent implements AfterViewInit, OnInit {
  hrp: HumanReadableProgram;
  // hrpInfos: HRPGraphicalInfos;
  selectedContext: ContextComponent;
  hover = '';
  depHovered = false;
  importEdits = {
    channelsVarName : [],
    channelsVarType : [],
    emittersVarName : [],
    emittersVarType : [],
    eventsVarName : [],
    eventsVarType : []
  };
  exportEdits = {
    channelsVarName : [],
    channelsVarType : [],
    emittersVarName : [],
    emittersVarType : [],
    eventsVarName : [],
    eventsVarType : []
  };
  localChanEdits = {
    varName : [],
    varType : []
  };

  pile: HumanReadableProgram[] = [];
  index: number;

  constructor(private ccblGfxService: CcblGfxService, private dragulaService: DragulaService) {
    this.ccblGfxService.addObserver(this.programChanged.bind(this));
    this.dragulaService.setOptions('bag', {
      moves: function (el: any, container: any, handle: any): any {
        return !el.firstChild.classList.contains('undraggable');
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
    // this.setHrpInfos(this.hrp.allen, this.hrpInfos.allen);
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
    if (!this.hrp.dependencies.import.channels) {
      this.hrp.dependencies.import.channels = [];
    }
    if (!this.hrp.dependencies.import.emitters) {
      this.hrp.dependencies.import.emitters = [];
    }
    if (!this.hrp.dependencies.import.events) {
      this.hrp.dependencies.import.events = [];
    }
    if (!this.hrp.dependencies.export.channels) {
      this.hrp.dependencies.export.channels = [];
    }
    if (!this.hrp.dependencies.export.emitters) {
      this.hrp.dependencies.export.emitters = [];
    }
    if (!this.hrp.dependencies.export.events) {
      this.hrp.dependencies.export.events = [];
    }
    if (!this.hrp.localChannels) {
      this.hrp.localChannels = [];
    }
    // this.hrpInfos = {
    //   editing: false,
    //   visible: true,
    //   allen: {
    //     During: [],
    //     StartWith: [],
    //     EndWith: []
    //   }
    // };
  }

  // setHrpInfos(allen: AllenRelationships, allenInfos: AllenGraphicalInfos) {
  //   const temp: ContextOrProgramInfos = {
  //     editing: false,
  //     visible: true,
  //     allen: {}
  //   };
  //   allenInfos.StartWith = [];
  //   allenInfos.During = [];
  //   allenInfos.EndWith = [];
  //   for (const a in allen) {
  //     allen.StartWith.forEach(s => {
  //       const tmpcpy = JSON.parse(JSON.stringify(temp));
  //       allenInfos.StartWith.push(tmpcpy);
  //       this.setHrpInfos((<HumanReadableStateContext>s).allen, tmpcpy.allen);
  //     });
  //     allen.During.forEach(d => {
  //       const tmpcpy = JSON.parse(JSON.stringify(temp));
  //       allenInfos.During.push(tmpcpy);
  //       this.setHrpInfos((<HumanReadableStateContext>d).allen, tmpcpy.allen);
  //     });
  //     allen.EndWith.forEach(e => {
  //       const tmpcpy = JSON.parse(JSON.stringify(temp));
  //       allenInfos.EndWith.push(tmpcpy);
  //       this.setHrpInfos((<HumanReadableStateContext>e).allen, tmpcpy.allen);
  //     });
  //   }
  // }

  closeInput($event: KeyboardEvent, struct: any, i: number): void {
    if ($event.key === 'Enter') {
      struct[i] = !struct[i];
    }
  }

  addNew(where) {
    const what = {
      name: 'NEW',
      type: 'NEW'
    };
    where.push(what);
  }

  deleteDependencyOrChan(whereInProg, refEditName, refEditType, index) {
    whereInProg.splice(index, 1);
    refEditName.splice(index, 1);
    refEditType.splice(index, 1);
  }
}
