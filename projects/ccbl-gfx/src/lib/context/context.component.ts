import {Component, HostListener, Input, OnInit} from '@angular/core';
import {HumanReadableStateContext} from 'ccbl-js/ProgramObjectInterface';
import {MatDialog} from "@angular/material";
import {VarSelectDialogComponent} from "../var-select-dialog/var-select-dialog.component";

@Component({
  selector: 'lib-context',
  styleUrls: ['context.component.css'],
  templateUrl: 'context.component.html'
})
export class ContextComponent implements OnInit {
  selected = false;
  hidden = true;

  // List of things editable in the first place (always editable)
  edits = {
    contextName: false,
    state: false
  };

  constructor(private dialog: MatDialog) {
  }

  @Input() context: HumanReadableStateContext;
  @Input() truc: (ContextComponent) => void;
  @Input() varHover: (identifier: string) => void;

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
    this.truc(this);
    this.selected = true;
  }

  ngOnInit(): void {
    if (!this.context.actions) {
      this.context.actions = [];
    }
    if (!this.context.allen) {
      this.context.allen = {};
    }
    if (!this.context.allen.During) {
      this.context.allen.During = [];
    }
  }

  unselect() {
    this.selected = false;
  }

  private deleteContext() {

  }

  private newAction() {
    this.context.actions.push({channel: 'NEW', affectation: {value: '0'}});
  }

  private newDuringContext() {
    this.context.allen.During.push({contextName: 'NEW', state: 'false'});
  }

  private changeAction(action: any) {
    const d = this.dialog.open(VarSelectDialogComponent);
    d.afterClosed().subscribe((r: string) => {
      action.channel = r;
    });
  }
}
