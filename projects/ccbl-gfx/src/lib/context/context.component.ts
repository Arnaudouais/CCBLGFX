import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HumanReadableStateContext} from 'ccbl-js/ProgramObjectInterface';
import {MatDialog} from "@angular/material";
import {VarSelectDialogComponent} from "../var-select-dialog/var-select-dialog.component";
import {CcblGfxComponent, ContextOrProgramInfos} from '../ccbl-gfx.component';
import {CcblGfxService} from "../ccbl-gfx.service";

@Component({
  selector: 'lib-context',
  styleUrls: ['context.component.scss'],
  templateUrl: 'context.component.html'
})
export class ContextComponent implements OnInit {
  selected = false;
  hidden = false;
  undraggable = false;
  editMode = false;
  hovered = false; // context is mouse hovered

  // List of things editable in the first place (always editable)
  edits = {
    contextName: false,
    state: false,
    actions: []
  };

  constructor(private dialog: MatDialog, private ccblService: CcblGfxService) {

  }

  @Input() context: HumanReadableStateContext;
  @Input() wrapper: CcblGfxComponent;
  @Input() parent: ContextComponent;
  // @Input() infos: ContextOrProgramInfos;

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
    this.wrapper.select(this);
    this.selected = true;
  }

  @HostListener('mouseenter', ['$event']) onMouseEnter($event) {
    $event.stopPropagation();
    this.hovered = true;
    if (this.parent) {
      this.parent.hovered = false;
    }
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave($event) {
    $event.stopPropagation();
    this.hovered = false;
    if (this.parent) {
      this.parent.hovered = true;
    }
  }

  @HostListener('dblclick', ['$event']) onDoubleClick($event) {
    $event.stopPropagation();
    this.onQuittingEditMode();
  }


  ngOnInit(): void {
    if (!this.context.actions) {
      this.context.actions = [];
    }
    if (!this.context.allen) {
      this.context.allen = {};
    }
    if (!this.context.allen.StartWith) {
      this.context.allen.StartWith = [];
    }
    if (!this.context.allen.During) {
      this.context.allen.During = [];
    }
    if (!this.context.allen.EndWith) {
      this.context.allen.EndWith = [];
    }
    if (!this.context.allen.Meet) {
      // this.context.allen.Meet = {};
    }

    if (!this.parent) {
      this.hidden = false;
    }

    this.context.actions.forEach(a => this.edits.actions.push(false));
    // this.hidden = !this.infos.visible;
    // this.editMode = this.infos.editing;
  }

  unselect() {
    this.selected = false;
  }

  edit() {
    this.editMode = true;
  }

  endEdit() {
    this.editMode = false;
  }


  hoverOn(name: string) {
    if (!this.parent) {
      this.wrapper.hoverOn(name);
    } else {
      this.parent.hoverOn(name);
    }
  }

  deleteContext(name?: string) {
    if (!name && this.parent) {
      this.parent.deleteContext(this.context.contextName);
      return;
    }

    for (let i = 0; i < this.context.allen.During.length; i++) {
      const sc = <HumanReadableStateContext> this.context.allen.During[i];
      if (sc.contextName === name) {
        this.context.allen.During.splice(i, 1);
        return;
      }
    }
    for (let i = 0; i < this.context.allen.StartWith.length; i++) {
      const sc = <HumanReadableStateContext> this.context.allen.StartWith[i];
      if (sc.contextName === name) {
        this.context.allen.StartWith.splice(i, 1);
        return;
      }
    }
    for (let i = 0; i < this.context.allen.EndWith.length; i++) {
      const sc = <HumanReadableStateContext> this.context.allen.EndWith[i];
      if (sc.contextName === name) {
        this.context.allen.EndWith.splice(i, 1);
        return;
      }
    }
  }

  deleteAction(i: number) {
    this.context.actions.splice(i, 1);
    this.edits.actions.splice(i, 1);
  }

  findChoices = (searchText: string) => {
    return this.ccblService.environmentNames.filter(item =>
      item.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  getChoiceLabel(choice: string) {
    return `${choice}`;
  }

  private newAction() {
    this.context.actions.push({channel: 'NEW', affectation: {value: '0'}});
  }

  private newStartWithContext() {
    this.context.allen.StartWith.push({contextName: 'NEW', state: 'false'});
  }

  private newDuringContext() {
    this.context.allen.During.push({contextName: 'NEW', state: 'false'});
  }

  private newEndWithContext() {
    this.context.allen.EndWith.push({contextName: 'NEW', state: 'false'});
  }

  private changeAction(action: any) {
    const d = this.dialog.open(VarSelectDialogComponent);
    d.afterClosed().subscribe((r: string) => {
      action.channel = r;
      this.onEdit();
    });
  }

  get _this() {
    return this;
  }

  private onEdit() {
    this.wrapper.onEdit();
  }

  private onQuittingEditMode() {
    let toEdit: boolean;
    toEdit = this.edits.state || this.edits.contextName;
    this.editMode = !this.editMode;
    this.edits.state = false;
    this.edits.contextName = false;

    for (const k in this.edits.actions) {
      toEdit = toEdit || this.edits.actions[k];
      this.edits.actions[k] = false;
    }
    if (toEdit) {
      this.onEdit();
    }
  }
  closeInputName($event: KeyboardEvent): void {
    console.log($event.key);
    if ($event.key === 'Enter') {
      this.edits.contextName = !this.edits.contextName;
      // this.onEdit();
    }
  }

  closeInputState($event: KeyboardEvent): void {
    console.log($event.key);
    if ($event.key === 'Enter') {
      this.edits.state = !this.edits.state;
      // this.onEdit();
    }
  }

  closeInputActions($event: KeyboardEvent, i: number): void {
    console.log($event.key + i);
    if ($event.key === 'Enter') {
      this.edits.actions[i] = !this.edits.actions[i];
      // this.onEdit();
    }
  }


}
